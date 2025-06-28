from fastapi import APIRouter, Request, Response, status, HTTPException
from fastapi.responses import RedirectResponse, JSONResponse
from api.v1.services.auth_services.google import GoogleAuthService
import secrets


router = APIRouter()

google_auth_service = GoogleAuthService()

@router.get("/login/google")
async def login_google():
    state = secrets.token_urlsafe(32)
    auth_url = google_auth_service.get_google_auth_url(state)
    response = RedirectResponse(url=auth_url)
    response.set_cookie(
        key="oauth_state",
        value=state,
        httponly=True,
        secure=False,
        samesite="lax"
    )
    return response

@router.get("/auth/google/callback")
async def auth_google_callback(
    code: str,
    state: str,
    request: Request,
    response: Response,
):
    try:
        result = await google_auth_service.handle_google_callback(code, state, request)
        response = RedirectResponse(url="/")

        # Set JWT token in HTTP-only cookie for user identification
        response.set_cookie(
            key="token",
            value=result["token"],
            max_age=google_auth_service.JWT_TOKEN_EXPIRE_MINUTES * 60,
            httponly=True,
            secure=False,
            samesite="lax"
        )

        return response
    
    except HTTPException as http_exc:
        return JSONResponse(
            status_code=http_exc.status_code,
            content={"error": http_exc.detail}
        )
    
    except Exception as e:
        print("Error in auth_google_callback:", e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": "Internal server error during authentication."}
        )
    
