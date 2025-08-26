from cryptography.fernet import Fernet
from dotenv import load_dotenv
import base64
import os

class AuthConfig:
    def __init__(self):
        load_dotenv(override=True)

    @property
    def GOOGLE_CLIENT_ID(self):
        return os.getenv("GOOGLE_CLIENT_ID")

    @property
    def GOOGLE_CLIENT_SECRET(self):
        return os.getenv("GOOGLE_CLIENT_SECRET")

    @property
    def GOOGLE_REDIRECT_URI(self):
        return os.getenv("GOOGLE_REDIRECT_URI")
    
    @property
    def FERNET_KEY(self):
        raw_key = os.getenv("FERNET_KEY")
        padded_key = base64.urlsafe_b64encode(raw_key.encode().ljust(32)[:32])
        return Fernet(padded_key)
    
    @property
    def JWT_SECRET_KEY(self):
        return os.getenv("JWT_SECRET_KEY")
    
    @property
    def FRONTEND_URL(self):
        return os.getenv("FRONTEND_URL")

class DBConfig:
    def __init__(self):
        load_dotenv(override=True)

    @property
    def MONGO_URI(self):
        return os.getenv("MONGO_URI")

    @property
    def MONGO_DB_NAME(self):
        return os.getenv("MONGO_DB_NAME")
    
auth_config = AuthConfig()
db_config = DBConfig()
