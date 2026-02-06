"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-[#0B1220] border-b border-[#1F2937] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-white">
          ANN
        </Link>

        <nav className="flex gap-6 text-gray-300">
          <Link href="/" className="hover:text-lime-400">Fact Check</Link>
          <Link href="/news" className="hover:text-lime-400">News</Link>
          <Link href="/chat" className="hover:text-lime-400">Chat</Link>
          <Link href="/api" className="hover:text-lime-400">API</Link>
          <Link href="/about" className="hover:text-lime-400">About</Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
