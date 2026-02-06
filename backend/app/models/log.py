from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime
from app.database import Base

class FactCheckLog(Base):
    __tablename__ = "fact_check_logs"

    id = Column(Integer, primary_key=True)
    query = Column(Text)
    verdict = Column(Text)
    score = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
