"use client";

import { useState } from "react";
// import LoadingSteps from "./LoadingSteps";   //

const [checkStatus, setCheckStatus] = useState<"idle" | "loading" | "done">("idle");

<button
  onClick={() => setCheckStatus("loading")}
  disabled={checkStatus === "loading"}
  className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-lime-500 transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/50 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
>
  {checkStatus === "loading" ? (
    <span className="flex items-center justify-center gap-2">
      <svg
        className="animate-spin h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Analyzing...
    </span>
  ) : (
    "Analyze"
  )}
</button>

{checkStatus === "loading" && (
  <div className="mt-8 text-center">
    {/* 방법 1: LoadingSteps 컴포넌트가 있다면 */}
    {/* <LoadingSteps /> */}

    {/* 방법 2: 임시 간단 로딩 UI (현재 추천) */}
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-gray-700 border-t-lime-400 rounded-full animate-spin"></div>
      <p className="text-gray-300 font-medium">분석 중입니다...</p>
      <div className="text-sm text-gray-500 space-y-1">
        <p>AI 모델 검증 중</p>
        <p>전문가 의견 수집 중</p>
        <p>커뮤니티 토론 분석 중</p>
      </div>
    </div>
  </div>
)}

