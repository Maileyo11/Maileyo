import aiohttp
import base64
import json
import re
import uuid
from typing import Optional, Dict, Any, List
from api.v1.utils.tokens import get_access_token


class GmailService:
    """Asynchronous service for interacting with the Gmail API."""

    BASE_URL: str = "https://www.googleapis.com/gmail/v1/users/me"
    BATCH_URL: str = "https://www.googleapis.com/batch/gmail/v1"

    # Folder → Gmail API query/label mapping
    FOLDER_MAP: Dict[str, Dict[str, Any]] = {
        "Primary+Sent": {
            "q": "(in:inbox category:primary) OR in:sent",
            "labelIds": []
        },
        "Inbox:Primary": {
            "q": "category:primary in:inbox",
            "labelIds": ["INBOX"]
        },
        "Inbox:Promotions": {"labelIds": ["CATEGORY_PROMOTIONS", "INBOX"]},
        "Inbox:Social": {"labelIds": ["CATEGORY_SOCIAL", "INBOX"]},
        "Starred": {"labelIds": ["STARRED"]},
        "Sent": {"labelIds": ["SENT"]},
        "Spam": {"labelIds": ["SPAM"]},
        "Drafts": {"labelIds": ["DRAFT"]},
        "AllMails": {"includeSpamTrash": True},
    }

    def __init__(self):
        """No user dependency at init - user_id is passed per request."""
        pass

    async def _get_headers(self, user_id: str) -> Dict[str, str]:
        """Retrieve a fresh access token for given user_id and return Gmail API headers."""
        access_token = await get_access_token(google_id=user_id)
        return {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

    async def fetch_message_ids(
        self,
        user_id: str,
        folder: str = "Inbox:Primary",
        max_results: int = 20,
        page_token: Optional[str] = None,
        query: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Fetch message IDs from Gmail by folder.

        Args:
            user_id: Google account ID
            folder: One of the keys from FOLDER_MAP
            max_results: Maximum number of results to fetch
            page_token: Page token for pagination
            query: Optional Gmail search query

        Returns:
            dict: Gmail API response containing message IDs and nextPageToken
        """
        if folder not in self.FOLDER_MAP:
            raise ValueError(
                f"Unknown folder '{folder}'. Valid options: {list(self.FOLDER_MAP.keys())}"
            )

        params: Dict[str, Any] = {"maxResults": max_results}
        params.update(self.FOLDER_MAP[folder])
        if page_token:
            params["pageToken"] = page_token
        if query:
            params["q"] = query

        url = f"{self.BASE_URL}/messages"
        headers = await self._get_headers(user_id)

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, params=params) as resp:
                if resp.status != 200:
                    raise Exception(
                        f"Gmail API Error {resp.status}: {await resp.text()}"
                    )
                return await resp.json()

    async def messages_batch_request(
        self, user_id: str, message_ids: List[str]
    ) -> List[Dict[str, Any]]:
        """
        Fetch full Gmail messages using batch request.

        Args:
            user_id: Google account ID
            message_ids: List of Gmail message IDs.

        Returns:
            List of message objects.
        """
        if not message_ids:
            return []

        headers = await self._get_headers(user_id)
        boundary = f"batch_{uuid.uuid4().hex}"

        # Construct multipart/mixed body
        body_lines = []
        for i, msg_id in enumerate(message_ids):
            content_id = i + 1
            body_lines.extend(
                [
                    f"--{boundary}",
                    "Content-Type: application/http",
                    f"Content-ID: {content_id}",
                    "",
                    f"GET /gmail/v1/users/me/messages/{msg_id}?format=full",
                    "",
                ]
            )
        body_lines.append(f"--{boundary}--")
        body = "\r\n".join(body_lines)

        batch_headers = {
            "Authorization": headers["Authorization"],
            "Content-Type": f"multipart/mixed; boundary={boundary}",
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                self.BATCH_URL, headers=batch_headers, data=body
            ) as resp:
                if resp.status != 200:
                    raise Exception(
                        f"Gmail Batch API Error {resp.status}: {await resp.text()}"
                    )
                
                # Get the content type and extract boundary from response headers
                content_type = resp.headers.get('Content-Type', '')
                boundary_match = re.search(r'boundary=([^;]+)', content_type)
                response_boundary = boundary_match.group(1) if boundary_match else boundary
                
                raw_response = await resp.text()

        # Parse multipart response
        messages: List[Dict[str, Any]] = []
        
        # Split the response into parts using the boundary
        parts = raw_response.split(f"--{response_boundary}")[1:-1]  # Skip first and last empty parts
        
        for part in parts:
            part = part.strip()
            if not part:
                continue
                
            # Check if this is an HTTP response part
            if "Content-Type: application/http" not in part:
                continue
                
            # Extract the HTTP response from the part
            http_response = part.split("\r\n\r\n", 1)[1] if "\r\n\r\n" in part else part
            
            # Parse the HTTP response
            response_lines = http_response.split("\r\n")
            
            # Check status line
            status_line = response_lines[0]
            if not status_line.startswith("HTTP/1.1 200 OK"):
                raise Exception(f"Batch subrequest failed: {status_line}")
            
            # Find the end of headers (empty line)
            header_end = None
            for i, line in enumerate(response_lines[1:], 1):
                if line.strip() == "":
                    header_end = i
                    break
                    
            if header_end is None:
                raise Exception("Invalid HTTP response format: no empty line after headers")
            
            # Extract JSON body
            json_body = "\r\n".join(response_lines[header_end+1:]).strip()
            
            try:
                message_data = json.loads(json_body)
                messages.append(message_data)
            except json.JSONDecodeError as e:
                raise Exception(f"Failed to parse JSON from batch response: {e}")

        return messages


    async def fetch_messages(
        self,
        user_id: str,
        folder: str = "Inbox:Primary",
        max_results: int = 20,
        page_token: Optional[str] = None,
        query: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Fetch full Gmail messages using message IDs (batched).

        Args:
            user_id: Google account ID
            folder: One of the keys from FOLDER_MAP
            max_results: Maximum number of results
            page_token: For pagination
            query: Optional Gmail search query

        Returns:
            dict with keys: emails, next_page_token, result_size_estimate, total_count
        """
        ids_response = await self.fetch_message_ids(
            user_id=user_id, folder=folder, max_results=max_results, page_token=page_token, query=query
        )

        message_ids = [m["id"] for m in ids_response.get("messages", [])]
        full_messages = await self.messages_batch_request(user_id, message_ids)

        return {
            "emails": full_messages,
            "next_page_token": ids_response.get("nextPageToken"),
            "result_size_estimate": ids_response.get("resultSizeEstimate", len(full_messages)),
            "total_count": len(full_messages),
        }
    
    async def fetch_emails_by_contact(
        self,
        user_id: str,
        email_address: str,
        max_results: int = 20,
        page_token: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Fetch all emails exchanged with a specific contact/email address.

        Args:
            user_id: Google account ID
            email_address: Contact's email address
            max_results: Maximum number of results
            page_token: For pagination

        Returns:
            dict with keys: emails, next_page_token, result_size_estimate, total_count
        """
        query = f"from:{email_address} OR to:{email_address}"

        return await self.fetch_messages(
            user_id=user_id,
            max_results=max_results,
            page_token=page_token,
            query=query,
        )
    
    async def send_email(
            self,
            user_id: str,
            to: str,
            subject: str,
            body_plain: str,
            body_html: Optional[str] = None,
            cc: Optional[List[str]] = None,
            bcc: Optional[List[str]] = None,
            attachments: Optional[List[Dict[str, Any]]] = None,
    ) -> Dict[str, Any]:
        """
        Send an email using Gmail API.

        Args:
            user_id: Google account ID
            to: Comma-separated recipient email addresses
            subject: Email subject
            body_plain: Plain text email body
            body_html: Optional HTML email body
            cc: Optional list of CC recipients
            bcc: Optional list of BCC recipients
            attachments: Optional list of attachments, each as dict with 'filename' and 'data' (base64)

        Returns:
            dict: Gmail API response for the sent message
        """
        from email.message import EmailMessage

        msg = EmailMessage()
        msg["To"] = to
        msg["Subject"] = subject
        msg["From"] = "me"  # 'me' indicates the authenticated user
        if cc:
            msg["Cc"] = ", ".join(cc)
        if bcc:
            msg["Bcc"] = ", ".join(bcc)

        msg.set_content(body_plain)
        if body_html:
            msg.add_alternative(body_html, subtype='html')
        if attachments:
            for attachment in attachments:
                filename = attachment["filename"]
                data = attachment["data"]
                msg.add_attachment(data, maintype='application', subtype='octet-stream', filename=filename)
        
        raw_msg = msg.as_bytes()
        encoded_msg = base64.urlsafe_b64encode(raw_msg).decode()
        payload = {"raw": encoded_msg}
        url = f"{self.BASE_URL}/messages/send"
        headers = await self._get_headers(user_id)
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=payload) as resp:
                if resp.status != 200:
                    raise Exception(f"Gmail Send API Error {resp.status}: {await resp.text()}")
                return await resp.json()
