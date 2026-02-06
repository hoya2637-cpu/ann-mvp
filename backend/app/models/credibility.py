from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from datetime import datetime
from app.database import Base

class CredibilityIndex(Base):
    __tablename__ = "credibility_index"

    id = Column(Integer, primary_key=True)
    news_id = Column(Integer, ForeignKey("news.id"))
    final_score = Column(Float)
    updated_at = Column(DateTime, default=datetime.utcnow)
