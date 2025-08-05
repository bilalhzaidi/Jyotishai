import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, Users, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const features = [
  {
    icon: Star,
    title: 'Advanced Gender Analysis',
    description: 'Personalized insights that consider gender-specific astrological influences for more accurate readings.',
  },
  {
    icon: Users,
    title: 'Comprehensive Reports',
    description: 'Detailed analysis covering personality, career, relationships, health, and spiritual growth.',
  },
  {
    icon: Shield,
    title: 'Professional Accuracy',
    description: 'Based on authentic Vedic astrology principles with modern psychological insights.',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Get your complete astrological profile generated within minutes, not days.',
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    content: 'The career guidance from Jyotishai helped me make the right decision about changing jobs. The gender-specific insights were incredibly accurate.',
    rating: 5,
  },
  {
    name: 'Rahul Patel',
    role: 'Business Owner',
    content: 'Amazing accuracy in the personality analysis. The relationship compatibility report helped me understand my partner better.',
    rating: 5,
  },
  {
    name: 'Anjali Gupta',
    role: 'Marketing Manager',
    content: 'The health insights were spot-on. I\'ve been following the recommendations and feel much better. Highly recommended!',
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: 'Basic',
    price: 99,
    period: 'month',
    description: 'Perfect for getting started with astrology',
    features: [
      '5 detailed reports per month',
      'Personality & career analysis',
      'Basic compatibility reports',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: 199,
    period: 'month',
    description: 'Most popular for regular users',
    features: [
      '25 detailed reports per month',
      'All report types available',
      'Advanced gender analysis',
      'Priority support',
      'PDF downloads',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 299,
    period: 'month',
    description: 'For professional astrologers',
    features: [
      '100 detailed reports per month',
      'All premium features',
      'White-label reports',
      'API access',
      'Phone support',
    ],
    popular: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative section-spacing overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="container-responsive relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Discover Your True Path with
              <span className="gradient-text block mt-2">
                Professional Vedic Astrology
              </span>
            </h1>
            <p className="text-large mb-8 max-w-2xl mx-auto">
              Get personalized insights into your personality, career, relationships, and health 
              with our advanced gender-aware astrological analysis powered by authentic Vedic principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/reports/demo">
                  View Sample Report
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-secondary/20">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Why Choose Jyotishai?</h2>
            <p className="text-large max-w-2xl mx-auto">
              Our platform combines ancient Vedic wisdom with modern technology 
              to provide the most accurate and personalized astrological insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-hover border-0 shadow-sm"
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Trusted by Thousands</h2>
            <p className="text-large">
              See what our users say about their Jyotishai experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-spacing bg-secondary/20">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Choose Your Plan</h2>
            <p className="text-large">
              Select the perfect plan for your astrological journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`card-hover relative ${
                  plan.popular ? 'border-primary shadow-lg' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">R{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <ArrowRight className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/auth/signup">
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container-responsive">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-2 mb-4">Ready to Discover Your Destiny?</h2>
            <p className="text-large mb-8">
              Join thousands of satisfied users who have found clarity and direction 
              through our professional Vedic astrology platform.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-small mt-4">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}