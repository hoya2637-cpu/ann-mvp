import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="logo">ANN</div>

          <nav className="nav">
            <a href="/">Fact Check</a>
            <a href="/news">News</a>
            <a href="/chat">Chat</a>
            <a href="/api">API</a>
            <a href="/about">About</a>
          </nav>
        </header>

        {children}

        <footer className="footer">
          © 2026 AI News Network
        </footer>
      </body>
    </html>
  );
}
