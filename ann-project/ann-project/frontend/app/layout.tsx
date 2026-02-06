import './globals.css';

export const metadata = {
  title: 'AI News Network',
  description: 'Analyze news credibility through AI, research, and public discourse.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
