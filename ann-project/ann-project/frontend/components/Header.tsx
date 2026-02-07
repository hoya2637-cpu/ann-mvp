"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "blur" : ""}`}>
      <div className="logo">ANN</div>

      <nav className="nav">
        <Link href="/">Fact Check</Link>
        <Link href="/news">News</Link>
        <Link href="/chat">Chat</Link>
        <Link href="/api">API</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
