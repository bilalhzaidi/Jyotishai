'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Header } from '@/components/layout/header'
import { FileText, Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewReportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    reportType: '',
    additionalNotes: ''
  })
  const [reportResult, setReportResult] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setReportResult(null)
    
    try {
      const payload = {
        name: formData.name,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime,
        birthPlace: formData.birthPlace,
        reportType: formData.reportType,
        additionalNotes: formData.additionalNotes
      }

      console.log('Submitting report request:', payload)
      
      const response = await fetch('http://localhost:8001/api/reports/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Report generated:', result)
      
      if (result.success) {
        setReportResult(result)
      } else {
        throw new Error('Report generation failed')
      }
      
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Generate New Report</CardTitle>
                  <CardDescription>Create a detailed astrological analysis report</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select 
                      value={formData.reportType}
                      onValueChange={(value) => setFormData({...formData, reportType: value})}
                    >
                      <SelectTrigger id="reportType">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personality">Personality Analysis</SelectItem>
                        <SelectItem value="career">Career Guidance</SelectItem>
                        <SelectItem value="love">Love & Relationships</SelectItem>
                        <SelectItem value="health">Health Predictions</SelectItem>
                        <SelectItem value="finance">Financial Forecast</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">
                      <Calendar className="inline-block h-4 w-4 mr-1" />
                      Birth Date
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthTime">
                      <Clock className="inline-block h-4 w-4 mr-1" />
                      Birth Time
                    </Label>
                    <Input
                      id="birthTime"
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="birthPlace">
                      <MapPin className="inline-block h-4 w-4 mr-1" />
                      Birth Place
                    </Label>
                    <Input
                      id="birthPlace"
                      placeholder="City, State/Province, Country"
                      value={formData.birthPlace}
                      onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific questions or areas of focus..."
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Report'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => router.push('/dashboard')}
                    disabled={isGenerating}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Report Results */}
          {reportResult && (
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-green-800">Report Generated Successfully!</CardTitle>
                    <CardDescription>Report ID: {reportResult.reportId}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">Personal Details</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p><strong>Name:</strong> {reportResult.name}</p>
                      <p><strong>Birth Date:</strong> {reportResult.birthDate}</p>
                      <p><strong>Birth Time:</strong> {reportResult.birthTime}</p>
                      <p><strong>Birth Place:</strong> {reportResult.birthPlace}</p>
                      <p><strong>Report Type:</strong> {reportResult.reportType}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Report Information</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p><strong>Generated:</strong> {new Date(reportResult.generatedAt).toLocaleString()}</p>
                      <p><strong>Status:</strong> <span className="capitalize text-green-600">{reportResult.status}</span></p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Analysis</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{reportResult.analysis}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={() => setReportResult(null)}
                    variant="outline"
                  >
                    Generate Another Report
                  </Button>
                  <Button 
                    onClick={() => router.push('/dashboard')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}