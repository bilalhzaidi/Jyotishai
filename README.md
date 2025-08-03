# JyotishAI - Professional Vedic Astrology SaaS Platform

A production-ready astrology web application built with Next.js 14, featuring subscription management, PayFast integration, and comprehensive Vedic astrology analysis with gender-aware insights.

## 🌟 Features

### ✨ Core Features
- **Complete Authentication System** with NextAuth (Google, GitHub, Email/Password)
- **Subscription Management** with 3 tiers (Basic, Pro, Premium)
- **Dual Payment Integration** - PayFast (South Africa) & Stripe (International)
- **Role-Based Access Control** (USER, ADMIN, MODERATOR)
- **Gender-Aware Astrology Analysis** (Male, Female, Non-binary, Prefer not to say)
- **Usage Tracking & Limits** per subscription plan
- **Admin Dashboard** with platform analytics
- **Responsive Design** for all devices

### 🔮 Astrology Features
- **Multiple Analysis Modules**: Personality, Career, Health, Marriage, Children, Finance
- **Gender-Specific Insights**: Tailored analysis considering gender influences
- **Comprehensive Reports** in multiple formats
- **Professional Accuracy** based on authentic Vedic principles
- **Instant Generation** powered by AI

## 💰 Subscription Plans

| Plan | Price (R/month) | Reports/Month | Features |
|------|---------|---------------|----------|
| **Basic** | R99 | 5 | Basic analysis, Email support |
| **Pro** | R199 | 25 | All features, Priority support, PDF downloads |
| **Premium** | R299 | 100 | White-label reports, API access, Phone support |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- PayFast merchant account (for South African payments)
- Stripe account (for international payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bilalhzaidi/Jyotishai.git
   cd Jyotishai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see your application.

## 🏗️ Project Structure

```
├── app/                   # Next.js 14 App Router
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── payments/     # Payment processing
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   └── admin/            # Admin interface
├── lib/                  # Utility libraries
│   ├── astrology/        # Astrology analysis engines
│   ├── auth.ts          # NextAuth configuration
│   ├── payfast.ts       # PayFast integration
│   └── stripe.ts        # Stripe integration
├── prisma/              # Database schema & migrations
├── components/          # Reusable UI components
├── types/               # TypeScript type definitions
└── middleware.ts        # Route protection
```

## 🔐 Authentication

- **NextAuth.js** with multiple providers:
  - Google OAuth2
  - GitHub OAuth2
  - Email/Password (credentials)
- **bcrypt** password hashing (12 rounds)
- **Role-based access control** (USER, ADMIN, MODERATOR)
- **JWT sessions** with secure configuration

## 💳 Payment Integration

### PayFast (South African Market)
- Complete transaction flow
- Webhook payment verification
- Automatic subscription activation
- ZAR currency support

### Stripe (International Market)
- Global payment processing
- Multiple currency support
- Subscription management
- Advanced analytics

## 🎨 UI/UX Features

- **Modern Design** with Tailwind CSS
- **Radix UI Components** for accessibility
- **Dark/Light Theme** support
- **Responsive Layout** for all devices
- **Beautiful Animations** and transitions
- **Professional Typography** system

## 📊 Admin Features

- Platform analytics dashboard
- User management interface
- Subscription monitoring
- Revenue tracking
- System settings management

## 🛠️ Development

```bash
# Development
npm run dev

# Database operations
npm run db:push        # Push schema changes
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed initial data

# Production build
npm run build
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are configured:

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret key (min 32 chars)
- `NEXTAUTH_URL` - Your app URL

**Payment Providers:**
- `PAYFAST_MERCHANT_ID`, `PAYFAST_MERCHANT_KEY` - PayFast credentials
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` - Stripe credentials

**OAuth (optional):**
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`

### Deployment Platforms

**Vercel (Recommended):**
```bash
npm run build
vercel --prod
```

**Docker:**
```bash
docker build -t jyotishai .
docker run -p 3000:3000 jyotishai
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# E2E tests with Playwright
npm run test:e2e
```

## 📈 Monitoring & Analytics

- **Built-in Analytics** dashboard
- **Google Analytics** integration
- **Error Tracking** with detailed logs
- **Performance Monitoring**
- **User Behavior Analytics**

## 🔒 Security Features

- **OWASP Security** best practices
- **Input Validation** with Zod schemas
- **CSRF Protection** built-in
- **Rate Limiting** on API endpoints
- **Secure Headers** configuration
- **SQL Injection Prevention** with Prisma

## 📄 API Documentation

The API is fully documented with OpenAPI/Swagger. Access the interactive documentation at:
- Development: `http://localhost:3000/api/docs`
- Production: `https://your-domain.com/api/docs`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Documentation**: Full docs available in `/docs` folder
- **Issues**: Report bugs on GitHub Issues
- **Email Support**: support@jyotishai.com
- **Community**: Join our Discord server

## 📄 License

This project is proprietary software. All rights reserved.

---

**JyotishAI** - Empowering lives through authentic Vedic wisdom and modern technology. ✨

Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, and Prisma.