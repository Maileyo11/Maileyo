import os
from dotenv import load_dotenv

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
        return os.getenv("FERNET_KEY")
    
    @property
    def JWT_SECRET_KEY(self):
        return os.getenv("JWT_SECRET_KEY")

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
