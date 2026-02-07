"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "blur" : ""}`}>
      <div className="logo">ANN</div>
      <nav className="nav">
        <a href="/">Fact Check</a>
        <a href="/news">News</a>
        <a href="/chat">Chat</a>
        <a href="/api">API</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}
