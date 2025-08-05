'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Heart, Users, Calendar, Clock, MapPin, ArrowLeft, User, User2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CompatibilityCheckPage() {
  const router = useRouter()
  const [person1, setPerson1] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  })
  const [person2, setPerson2] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Compatibility check:', { person1, person2 })
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
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Compatibility Analysis</CardTitle>
                  <CardDescription>Analyze relationship compatibility between two individuals</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="person1" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="person1" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      First Person
                    </TabsTrigger>
                    <TabsTrigger value="person2" className="flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      Second Person
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="person1" className="space-y-4 mt-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        First Person's Details
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name1">Full Name</Label>
                          <Input
                            id="name1"
                            placeholder="Enter full name"
                            value={person1.name}
                            onChange={(e) => setPerson1({...person1, name: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthDate1">
                            <Calendar className="inline-block h-4 w-4 mr-1" />
                            Birth Date
                          </Label>
                          <Input
                            id="birthDate1"
                            type="date"
                            value={person1.birthDate}
                            onChange={(e) => setPerson1({...person1, birthDate: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthTime1">
                            <Clock className="inline-block h-4 w-4 mr-1" />
                            Birth Time
                          </Label>
                          <Input
                            id="birthTime1"
                            type="time"
                            value={person1.birthTime}
                            onChange={(e) => setPerson1({...person1, birthTime: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthPlace1">
                            <MapPin className="inline-block h-4 w-4 mr-1" />
                            Birth Place
                          </Label>
                          <Input
                            id="birthPlace1"
                            placeholder="City, Country"
                            value={person1.birthPlace}
                            onChange={(e) => setPerson1({...person1, birthPlace: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="person2" className="space-y-4 mt-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User2 className="h-5 w-5" />
                        Second Person's Details
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name2">Full Name</Label>
                          <Input
                            id="name2"
                            placeholder="Enter full name"
                            value={person2.name}
                            onChange={(e) => setPerson2({...person2, name: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthDate2">
                            <Calendar className="inline-block h-4 w-4 mr-1" />
                            Birth Date
                          </Label>
                          <Input
                            id="birthDate2"
                            type="date"
                            value={person2.birthDate}
                            onChange={(e) => setPerson2({...person2, birthDate: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthTime2">
                            <Clock className="inline-block h-4 w-4 mr-1" />
                            Birth Time
                          </Label>
                          <Input
                            id="birthTime2"
                            type="time"
                            value={person2.birthTime}
                            onChange={(e) => setPerson2({...person2, birthTime: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthPlace2">
                            <MapPin className="inline-block h-4 w-4 mr-1" />
                            Birth Place
                          </Label>
                          <Input
                            id="birthPlace2"
                            placeholder="City, Country"
                            value={person2.birthPlace}
                            onChange={(e) => setPerson2({...person2, birthPlace: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">What you'll discover:</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <Heart className="h-5 w-5 text-pink-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Love Compatibility</p>
                          <p className="text-sm text-gray-600">Emotional connection and romance potential</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Communication Style</p>
                          <p className="text-sm text-gray-600">How well you understand each other</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Growth Potential</p>
                          <p className="text-sm text-gray-600">Long-term relationship prospects</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Overall Score</p>
                          <p className="text-sm text-gray-600">Comprehensive compatibility rating</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    disabled={!person1.name || !person2.name}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Check Compatibility
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

// Add missing imports
import { TrendingUp, Star } from 'lucide-react'