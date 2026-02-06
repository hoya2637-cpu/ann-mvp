from fastapi import APIRouter
from pydantic import BaseModel
from app.services.credibility_engine import calculate_credibility

router = APIRouter(prefix="/fact-check", tags=["Fact Check"])

class FactCheckRequest(BaseModel):
    query: str

@router.post("/")
def fact_check(request: FactCheckRequest):
    """
    Fact Check API
    
    MVP: 임시 점수 (LLM 연동 전)
    """
    # MVP: 임시 점수
    base_ai_score = 72
    expert_score = 60
    discussion_score = 55
    stability_score = 80

    final_score = calculate_credibility(
        base_ai_score,
        expert_score,
        discussion_score,
        stability_score
    )

    return {
        "query": request.query,
        "credibility_score": final_score,
        "status": "beta",
        "components": {
            "ai_score": base_ai_score,
            "expert_score": expert_score,
            "discussion_score": discussion_score,
            "stability_score": stability_score
        }
    }
