import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ANN - AI News Network',
  description: 'Verify the Truth with AI-powered Fact Checking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
