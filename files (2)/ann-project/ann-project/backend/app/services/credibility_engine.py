def calculate_credibility(
    base_ai_score: float,
    expert_score: float,
    discussion_score: float,
    stability_score: float
) -> float:
    """
    ANN Credibility Index 계산
    
    가중치:
    - AI 분석: 35%
    - Expert 의견: 35%
    - 커뮤니티 토론: 20%
    - 시간 안정성: 10%
    """
    score = (
        base_ai_score * 0.35 +
        expert_score * 0.35 +
        discussion_score * 0.20 +
        stability_score * 0.10
    )

    return round(min(max(score, 0), 100), 2)
