<button
  onClick={() => setCheckStatus("loading")}
  disabled={checkStatus === "loading"}
  className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-lime-500 transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/50 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
>
  {checkStatus === "loading" ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Analyzing...
    </span>
  ) : (
    "Analyze"
  )}
</button>

{checkStatus === "loading" && (
  <div className="mt-10 text-center">
    <div className="w-20 h-20 border-4 border-gray-700 border-t-lime-400 rounded-full animate-spin mx-auto"></div>
    <p className="mt-6 text-lg font-medium text-gray-200">팩트체크를 진행하고 있습니다</p>
    <p className="mt-2 text-sm text-gray-500">
      AI 분석 · 전문가 의견 · 커뮤니티 토론 검토 중...
    </p>
  </div>
)}
