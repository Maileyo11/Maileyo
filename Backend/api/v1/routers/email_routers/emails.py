from fastapi import APIRouter, HTTPException, status, Request, Depends, BackgroundTasks
from typing import Optional
import logging
from datetime import datetime

from api.v1.schemas.emails import (
    FetchEmailsResponse, FetchEmailsByContactRequest,
    SendEmailRequest, SendEmailResponse, EmailFolder,
    DownloadAttachmentResponse
)
from api.v1.services.email_services.gmail_service import GmailService
from api.v1.utils.tokens import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/emails", tags=["emails"])

# Initialize Gmail service
gmail_service = GmailService()


@router.get("/fetch", response_model=FetchEmailsResponse)
async def fetch_emails(
    request: Request,
    folder: EmailFolder = EmailFolder.INBOX_PRIMARY,
    max_results: int = 10,
    page_token: Optional[str] = None,
    query: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    try:
        if max_results < 1 or max_results > 100:    
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="max_results must be between 1 and 100"
            )
        
        result = await gmail_service.fetch_messages(
            user_id=current_user["google_id"],
            folder=folder,
            max_results=max_results,
            page_token=page_token,
            query=query
        )
        
        return FetchEmailsResponse(
            emails=result["emails"],
            next_page_token=result["next_page_token"],
            result_size_estimate=result["result_size_estimate"],
            total_count=result["total_count"]
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching emails: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch emails"
        )


@router.post("/fetch-by-contact", response_model=FetchEmailsResponse)
async def fetch_emails_by_contact(
    request: Request,
    contact_request: FetchEmailsByContactRequest,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user)
):
    try:
        if contact_request.max_results < 1 or contact_request.max_results > 100:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="max_results must be between 1 and 100"
            )
        
        result = await gmail_service.fetch_emails_by_contact(
            user_id=current_user["google_id"],
            email_address=contact_request.email_address,
            background_tasks=background_tasks,
            max_results=contact_request.max_results,
            page_token=contact_request.page_token
        )
        
        return FetchEmailsResponse(
            emails=result["emails"],
            next_page_token=result["next_page_token"],
            result_size_estimate=result["result_size_estimate"],
            total_count=result["total_count"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching emails by contact: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch emails by contact"
        )


@router.post("/send", response_model=SendEmailResponse)
async def send_email(
    request: Request,
    email_request: SendEmailRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        if not email_request.to:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="At least one recipient is required"
            )
        
        if not email_request.body_plain and not email_request.body_html:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Either plain text or HTML body is required"
            )
        
        result = await gmail_service.send_email(
            user_id=current_user["google_id"],
            to=email_request.to,
            subject=email_request.subject,
            body_plain=email_request.body_plain,
            body_html=email_request.body_html,
            cc=email_request.cc,
            bcc=email_request.bcc,
            attachments=email_request.attachments
        )
        
        return SendEmailResponse(
            message_id=result["id"],
            thread_id=result.get("threadId"),
            status="sent",
            sent_at=datetime.now()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send email"
        )

@router.get("/attachments/{message_id}/{attachment_id}", response_model=DownloadAttachmentResponse)
async def download_attachment(
    message_id: str,
    attachment_id: str,
    file_name: str = "attachment",
    mime_type: str = "application/octet-stream",
    current_user: dict = Depends(get_current_user),
):
    """
    Download an email attachment by message ID and attachment ID.
    
    - **message_id**: Gmail message ID containing the attachment
    - **attachment_id**: Specific attachment ID within the message
    """
    try:
        result = await gmail_service.download_attachment(
            user_id=current_user["google_id"],
            message_id=message_id,
            attachment_id=attachment_id,
            file_name=file_name,
            mime_type=mime_type
        )
        
        return DownloadAttachmentResponse(
            filename=result["filename"],
            mime_type=result["mime_type"],
            size=result["size"],
            data=result["data"]  # base64 encoded
        )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error downloading attachment: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to download attachment"
        )
