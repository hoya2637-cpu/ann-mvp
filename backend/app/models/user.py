from sqlalchemy import Column, Integer, Text, Boolean
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    role = Column(Text)  # user / expert / admin
    is_verified = Column(Boolean, default=False)
