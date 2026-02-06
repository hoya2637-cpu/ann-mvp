WEIGHTS = {
    "ai": 0.35,
    "expert": 0.35,
    "discussion": 0.20,
    "stability": 0.10
}

def update_weights(new_weights: dict):
    """가중치 업데이트"""
    WEIGHTS.update(new_weights)
    return WEIGHTS

def get_weights():
    """현재 가중치 조회"""
    return WEIGHTS
