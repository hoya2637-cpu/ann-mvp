from fastapi import APIRouter
from pydantic import BaseModel
from app.services.weight_config import update_weights, get_weights

router = APIRouter(prefix="/admin/experts", tags=["Admin"])

# MVP: 메모리 DB
EXPERTS = []

class ExpertApproval(BaseModel):
    user_id: int

class WeightUpdate(BaseModel):
    ai: float
    expert: float
    discussion: float
    stability: float

@router.post("/approve")
def approve_expert(request: ExpertApproval):
    """전문가 승인"""
    for u in EXPERTS:
        if u["id"] == request.user_id:
            u["is_verified"] = True
            return {"status": "approved", "user_id": request.user_id}
    return {"error": "User not found"}

@router.get("/list")
def list_experts():
    """전문가 목록 조회"""
    return {"experts": EXPERTS}

@router.post("/weights")
def update_weight_config(request: WeightUpdate):
    """가중치 설정 업데이트"""
    return update_weights({
        "ai": request.ai,
        "expert": request.expert,
        "discussion": request.discussion,
        "stability": request.stability
    })

@router.get("/weights")
def get_weight_config():
    """현재 가중치 조회"""
    return get_weights()
