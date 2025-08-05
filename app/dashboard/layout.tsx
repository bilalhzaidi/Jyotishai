import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Jyotishai',
  description: 'Your personal astrology dashboard with reports, insights, and recommendations.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}