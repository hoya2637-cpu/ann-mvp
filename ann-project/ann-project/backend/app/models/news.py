from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from datetime import datetime
from app.database import Base

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    source = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    base_ai_score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
