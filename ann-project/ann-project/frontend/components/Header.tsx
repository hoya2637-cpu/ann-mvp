// components/Header.tsx
"use client";

import { useState } from "react"; // 아직 상태를 안 쓰지만, 나중에 메뉴 토글 등에 사용할 수 있음

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1220]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* 로고 */}
        <div className="text-2xl font-bold text-lime-400">ANN</div>

        {/* 나머지 헤더 요소들 (여기에 네비게이션, 버튼 등 추가) */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#fact-check" className="text-gray-300 hover:text-lime-400 transition-colors">
            Fact Check
          </a>
          <a href="#features" className="text-gray-300 hover:text-lime-400 transition-colors">
            Features
          </a>
          <a href="#about" className="text-gray-300 hover:text-lime-400 transition-colors">
            About
          </a>
          {/* 예시 버튼 */}
          <button className="bg-lime-400 text-black px-5 py-2 rounded-lg font-medium hover:bg-lime-500 transition-all">
            Get Started
          </button>
        </nav>

        {/* 모바일 메뉴 버튼 (필요 시) */}
        <button className="md:hidden text-lime-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
