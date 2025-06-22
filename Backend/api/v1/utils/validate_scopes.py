from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

# Keep this in sync with your main auth config
REQUIRED_SCOPES = {
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send"
}


def normalize_scope(scope: str) -> str:
    mapping = {
        "https://www.googleapis.com/auth/userinfo.email": "email",
        "https://www.googleapis.com/auth/userinfo.profile": "profile"
    }
    return mapping.get(scope, scope)


def validate_scopes(scope_string: str):
    """
    Validates that all required scopes are granted.
    Raises HTTPException if any required scope is missing.
    """
    raw_scopes = scope_string.split()
    granted_scopes = {normalize_scope(scope) for scope in raw_scopes}

    if not REQUIRED_SCOPES.issubset(granted_scopes):
        missing_scopes = REQUIRED_SCOPES - granted_scopes
        logger.error(f"Missing required scopes: {missing_scopes}")
        raise HTTPException(
            status_code=403,
            detail=f"Missing required permissions: {', '.join(missing_scopes)}"
        )
