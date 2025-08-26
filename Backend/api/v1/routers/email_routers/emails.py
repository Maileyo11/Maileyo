from fastapi import APIRouter, HTTPException, status, Request, Depends
from typing import Optional
import logging

from api.v1.schemas.emails import (
    FetchEmailsResponse, FetchEmailsByContactRequest,
    SendEmailRequest, SendEmailResponse, EmailFolder
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
    """
    Fetch emails from specified Gmail folder with pagination and search
    
    - **folder**: Gmail folder to fetch from (INBOX, STARRED, SENT, SPAM)
    - **max_results**: Maximum number of emails to return (1-100)
    - **page_token**: Token for pagination
    - **query**: Optional search query to filter emails
    """
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
    current_user: dict = Depends(get_current_user)
):
    """
    Fetch all emails exchanged with a specific contact/email address
    
    - **email_address**: Email address of the contact
    - **max_results**: Maximum number of emails to return (1-100)
    - **page_token**: Token for pagination
    """
    try:
        if contact_request.max_results < 1 or contact_request.max_results > 100:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="max_results must be between 1 and 100"
            )
        
        result = await gmail_service.fetch_emails_by_contact(
            user_id=current_user["google_id"],
            email_address=contact_request.email_address,
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
    """
    Send email with full Gmail capabilities
    
    - **to**: List of recipient email addresses
    - **cc**: Optional list of CC recipients
    - **bcc**: Optional list of BCC recipients
    - **subject**: Email subject
    - **body_plain**: Plain text email body
    - **body_html**: HTML email body
    - **attachments**: Optional list of file attachments
    """
    try:
        # Validate request
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
        
        # Send email
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
            thread_id=result["thread_id"],
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send email"
        )

