import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Calendar, FileText, Users, TrendingUp, Star, Clock, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const dashboardStats = [
  {
    title: 'Reports Generated',
    value: '12',
    description: 'This month',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Consultations',
    value: '3',
    description: 'Scheduled',
    icon: Calendar,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Compatibility Checks',
    value: '8',
    description: 'Completed',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Accuracy Rating',
    value: '4.8',
    description: 'Out of 5',
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
]

const recentReports = [
  {
    title: 'Personality Analysis',
    date: '2 hours ago',
    status: 'completed',
    type: 'personality',
  },
  {
    title: 'Career Guidance Report',
    date: '1 day ago',
    status: 'completed',
    type: 'career',
  },
  {
    title: 'Relationship Compatibility',
    date: '3 days ago',
    status: 'completed',
    type: 'relationship',
  },
  {
    title: 'Health Analysis',
    date: '1 week ago',
    status: 'completed',
    type: 'health',
  },
]

const quickActions = [
  {
    title: 'Generate New Report',
    description: 'Create a detailed astrological analysis',
    href: '/reports/new',
    icon: FileText,
  },
  {
    title: 'Schedule Consultation',
    description: 'Book a session with our experts',
    href: '/consultations/book',
    icon: Calendar,
  },
  {
    title: 'Check Compatibility',
    description: 'Analyze relationship compatibility',
    href: '/compatibility/new',
    icon: Users,
  },
  {
    title: 'AI Astrology Chat',
    description: 'Get instant insights from AI assistant',
    href: '/chat',
    icon: MessageSquare,
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your astrological journey.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Pro Plan
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Generate reports and book consultations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  asChild
                >
                  <Link href={action.href}>
                    <div className="flex items-start gap-3">
                      <action.icon className="h-5 w-5 mt-0.5" />
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="md:col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Your latest astrological analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {report.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {report.status}
                      </Badge>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/reports/${report.type}/${index + 1}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events/Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Astrological Insights</CardTitle>
            <CardDescription>
              Personalized recommendations based on current planetary positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Today's Transit</h4>
                <p className="text-sm text-muted-foreground">
                  Jupiter is in a favorable position for career advancement. 
                  Consider taking initiative in professional matters.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Weekly Recommendation</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on relationships this week. Venus transit suggests 
                  good time for meaningful connections.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}