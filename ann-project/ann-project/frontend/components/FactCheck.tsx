"use client";

import { useState } from "react";
import LoadingSteps from "./LoadingSteps";
import { checkFact } from "@/lib/api";

const [checkStatus, setCheckStatus] = useState<"idle" | "loading" | "done">("idle");

<button 
  onClick={() => setCheckStatus("loading")}
  disabled={checkStatus === "loading"}
  className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-lime-500 transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/50 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
>
  {checkStatus === "loading" ? (
    <span className="flex items-center gap-2">
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

{checkStatus === "loading" && <LoadingSteps />}
  <div className="mt-8 text-center">
    {/* 로딩 스피너나 <LoadingSteps /> 컴포넌트 */}
    <LoadingSteps />
  </div>
)}


