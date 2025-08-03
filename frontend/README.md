# Jyotishai - Professional Vedic Astrology SaaS Platform

A modern, production-ready SaaS platform for Vedic astrology with advanced gender-aware analysis, built with Next.js 14, TypeScript, and Prisma.

## Features

### Core Features
- **Advanced Gender-Aware Analysis**: Personalized astrological insights that consider gender-specific influences
- **Multiple Report Types**: Personality, career, relationships, health, marriage, spirituality, and full readings
- **Professional Accuracy**: Based on authentic Vedic astrology principles with modern psychological insights
- **Real-time Generation**: Complete astrological profiles generated within minutes

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Prisma ORM** with PostgreSQL
- **NextAuth.js** for authentication
- **Tailwind CSS** with custom design system
- **Radix UI** components
- **PayFast & Stripe** payment integration
- **Role-based access control**
- **Responsive design**

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Required API keys (see Environment Variables section)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Environment Variables

### Required
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jyotishai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# At least one OAuth provider
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Optional
```bash
# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# PayFast (South African payments)
PAYFAST_MERCHANT_ID="your-merchant-id"
PAYFAST_MERCHANT_KEY="your-merchant-key"
PAYFAST_PASSPHRASE="your-passphrase"
PAYFAST_SANDBOX="true"

# Stripe (International payments)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (for notifications)
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@yourdomain.com"

# AI APIs (for enhanced analysis)
OPENAI_API_KEY="your-openai-key"
ANTHROPIC_API_KEY="your-anthropic-key"
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── admin/             # Admin panel
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Database client
│   ├── payfast.ts        # PayFast integration
│   ├── stripe.ts         # Stripe integration
│   └── astrology/        # Astrology analysis engine
├── prisma/               # Database schema and migrations
├── types/                # TypeScript type definitions
└── hooks/                # Custom React hooks
```

## Database Schema

The application uses a comprehensive database schema with the following main models:

- **User**: User accounts with profile information and subscription details
- **Report**: Generated astrology reports with analysis data
- **Payment**: Payment records for subscription management
- **SystemSetting**: Configurable application settings

## API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- NextAuth.js handles OAuth and session management

### Reports
- `POST /api/reports` - Generate new astrology report
- `GET /api/reports` - List user's reports
- `GET /api/reports/[id]` - Get specific report

### Payments
- `POST /api/payments/payfast` - Create PayFast payment
- `POST /api/payments/stripe` - Create Stripe payment
- `POST /api/webhooks/payfast` - PayFast webhook handler
- `POST /api/webhooks/stripe` - Stripe webhook handler

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - User management
- `GET /api/admin/reports` - Report management

## Gender-Aware Analysis Engine

The core feature of Jyotishai is its sophisticated gender-aware astrology analysis:

### Key Components
- **GenderAwareAstrologyEngine**: Main analysis engine that considers gender-specific planetary influences
- **AstrologyReportGenerator**: Generates comprehensive reports with gender-appropriate language and insights
- **Planetary Position Calculator**: Simulates planetary positions (integrate with real astronomical data in production)

### Analysis Areas
1. **Personality**: Gender-specific traits, communication styles, leadership approaches
2. **Relationships**: Dating patterns, compatibility factors, marriage timing
3. **Career**: Suitable fields, work environments, leadership potential
4. **Health**: Gender-specific health concerns, preventive measures
5. **Spirituality**: Meditation practices, growth areas, spiritual inclinations

## Subscription Plans

### Basic Plan (R99/month)
- 5 detailed reports per month
- Personality & career analysis
- Basic compatibility reports
- Email support

### Pro Plan (R199/month) - Most Popular
- 25 detailed reports per month
- All report types available
- Advanced gender analysis
- Priority support
- PDF downloads

### Premium Plan (R299/month)
- 100 detailed reports per month
- All premium features
- White-label reports
- API access
- Phone support

## Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:push         # Push schema changes
npm run db:migrate      # Create and run migrations
npm run db:seed         # Seed database with sample data
npm run db:reset        # Reset database

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

### Database Setup
1. Set up a PostgreSQL database (Supabase, PlanetScale, or AWS RDS)
2. Run migrations: `npm run db:push`
3. Seed initial data: `npm run db:seed`

## Security Features

- **Input Validation**: Zod schemas for all forms and API endpoints
- **Authentication**: Secure session management with NextAuth.js
- **Authorization**: Role-based access control (USER, ADMIN, MODERATOR)
- **Payment Security**: PCI-compliant payment processing
- **Data Protection**: Encrypted sensitive data, secure API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support and questions:
- Email: support@jyotishai.com
- Documentation: [docs.jyotishai.com](https://docs.jyotishai.com)
- GitHub Issues: For technical issues and bug reports

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.