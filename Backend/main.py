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
    "https://app.maileyo.com",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:5173",
    "https://maileyo.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(google.router, tags=["auth"])
app.include_router(emails.router, tags=["emails"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
