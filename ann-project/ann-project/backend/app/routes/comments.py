from fastapi import APIRouter
from pydantic import BaseModel
from app.services.discussion_score import calculate_discussion_score

router = APIRouter(prefix="/comments", tags=["Comments"])

# MVP: 메모리 DB
COMMENTS_DB = []

class CommentRequest(BaseModel):
    news_id: int
    user: str
    content: str
    is_expert: bool = False

@router.post("/")
def add_comment(request: CommentRequest):
    """댓글 추가"""
    comment = {
        "news_id": request.news_id,
        "user": request.user,
        "content": request.content,
        "is_expert": request.is_expert
    }
    COMMENTS_DB.append(comment)
    return {"status": "ok", "comment": comment}

@router.get("/{news_id}")
def get_comments(news_id: int):
    """특정 뉴스의 댓글 조회"""
    comments = [c for c in COMMENTS_DB if c["news_id"] == news_id]
    score = calculate_discussion_score(comments)
    return {
        "comments": comments,
        "discussion_score": score,
        "total_comments": len(comments)
    }
