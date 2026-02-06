import "./globals.css";

export const metadata = {
  title: "AI News Network",
  description: "Trust, Verified by ANN",
};

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

        <main>{children}</main>

        <footer className="footer">
          © {new Date().getFullYear()} AI News Network
        </footer>
      </body>
    </html>
  );
}
