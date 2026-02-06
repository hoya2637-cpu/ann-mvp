from sqlalchemy import Column, Integer, Text, Boolean, ForeignKey, DateTime
from datetime import datetime
from app.database import Base

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    news_id = Column(Integer, ForeignKey("news.id"))
    user_name = Column(Text)
    content = Column(Text)
    is_expert = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
