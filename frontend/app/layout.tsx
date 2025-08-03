import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jyotishai - Professional Vedic Astrology Platform',
  description: 'Get personalized Vedic astrology reports with advanced gender-aware analysis. Professional astrology insights for personality, career, relationships, and health.',
  keywords: 'vedic astrology, horoscope, birth chart, astrology reports, compatibility, career guidance',
  authors: [{ name: 'Jyotishai Team' }],
  openGraph: {
    title: 'Jyotishai - Professional Vedic Astrology Platform',
    description: 'Get personalized Vedic astrology reports with advanced gender-aware analysis.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jyotishai - Professional Vedic Astrology Platform',
    description: 'Get personalized Vedic astrology reports with advanced gender-aware analysis.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}