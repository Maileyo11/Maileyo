from fastapi import FastAPI
from api.v1.routers.auth_routers import google
from api.v1.routers.email_routers import emails
from fastapi.middleware.cors import CORSMiddleware
from api.v1.db.init_db import init_db, close_db
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()

app = FastAPI(lifespan=lifespan)

origins = [
    "https://maileyo.in",       
    "https://www.maileyo.in",   
    "http://localhost:8000",    
    "http://localhost:8080",    
    "http://localhost:5173",    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]  # Add this line
)

app.include_router(google.router, tags=["auth"])
app.include_router(emails.router, tags=["emails"])

@app.get("/wakeup")
async def wakeup():
    return {"status": "awake", "message": "This server is awake."}

@app.head("/wakeup")
async def wakeup_head():
    return

# Add explicit OPTIONS handler for preflight requests
@app.options("/{full_path:path}")
async def options_handler():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
