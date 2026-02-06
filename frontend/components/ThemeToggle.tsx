"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-3 py-1 border border-gray-600 rounded text-sm hover:bg-gray-800"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
