"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    });
  }, []);

  return (
    <header className={scrolled ? "header blur" : "header"}>
      <div className="logo">ANN</div>
      <nav>
        <a href="/">Fact Check</a>
        <a href="/news">News</a>
        <a href="/chat">Chat</a>
        <a href="/api">API</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 16px 40px;
  transition: all 0.3s ease;
}

.header.blur {
  backdrop-filter: blur(12px);
  background: rgba(11,18,32,0.7);
}
