'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Header } from '@/components/layout/header'
import { Calendar, Clock, Video, Phone, MessageSquare, ArrowLeft, User, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BookConsultationPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    duration: '',
    topic: '',
    specificQuestions: ''
  })

  const availableSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Consultation booked:', { ...formData, date: selectedDate, time: selectedTime })
    // For now, redirect back to dashboard
    router.push('/dashboard')
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Schedule Consultation</CardTitle>
                  <CardDescription>Book a personalized session with our expert astrologers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        <User className="inline-block h-4 w-4 mr-1" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="inline-block h-4 w-4 mr-1" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="inline-block h-4 w-4 mr-1" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Consultation Details</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Consultation Type</Label>
                      <Select 
                        value={formData.consultationType}
                        onValueChange={(value) => setFormData({...formData, consultationType: value})}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select consultation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4" />
                              Video Call
                            </div>
                          </SelectItem>
                          <SelectItem value="phone">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone Call
                            </div>
                          </SelectItem>
                          <SelectItem value="chat">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Text Chat
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Session Duration</Label>
                      <Select 
                        value={formData.duration}
                        onValueChange={(value) => setFormData({...formData, duration: value})}
                      >
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes - $50</SelectItem>
                          <SelectItem value="60">60 minutes - $90</SelectItem>
                          <SelectItem value="90">90 minutes - $130</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Consultation Topic</Label>
                      <Select 
                        value={formData.topic}
                        onValueChange={(value) => setFormData({...formData, topic: value})}
                      >
                        <SelectTrigger id="topic">
                          <SelectValue placeholder="Select main topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Reading</SelectItem>
                          <SelectItem value="career">Career & Business</SelectItem>
                          <SelectItem value="relationship">Love & Relationships</SelectItem>
                          <SelectItem value="health">Health & Wellness</SelectItem>
                          <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                          <SelectItem value="family">Family Matters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-semibold">Schedule</h3>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="date">
                          <Calendar className="inline-block h-4 w-4 mr-1" />
                          Preferred Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">
                          <Clock className="inline-block h-4 w-4 mr-1" />
                          Preferred Time
                        </Label>
                        <Select 
                          value={selectedTime}
                          onValueChange={setSelectedTime}
                        >
                          <SelectTrigger id="time">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="questions">Specific Questions (Optional)</Label>
                      <Textarea
                        id="questions"
                        placeholder="Any specific questions or areas you'd like to focus on during the consultation..."
                        value={formData.specificQuestions}
                        onChange={(e) => setFormData({...formData, specificQuestions: e.target.value})}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white">
                    Book Consultation
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => router.push('/dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}