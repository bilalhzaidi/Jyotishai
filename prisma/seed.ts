import { PrismaClient, UserRole, SubscriptionPlan, SubscriptionStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jyotishai.com' },
    update: {},
    create: {
      email: 'admin@jyotishai.com',
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      subscriptionPlan: SubscriptionPlan.PREMIUM,
      reportsLimit: 999999,
    },
  })

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@jyotishai.com' },
    update: {},
    create: {
      email: 'test@jyotishai.com',
      name: 'Test User',
      firstName: 'Test',
      lastName: 'User',
      role: UserRole.USER,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      subscriptionPlan: SubscriptionPlan.BASIC,
      reportsLimit: 5,
    },
  })

  // Create system settings
  const systemSettings = [
    { key: 'app_name', value: 'Jyotishai' },
    { key: 'app_description', value: 'Professional Vedic Astrology Platform' },
    { key: 'basic_plan_price', value: '99.00' },
    { key: 'pro_plan_price', value: '199.00' },
    { key: 'premium_plan_price', value: '299.00' },
    { key: 'basic_reports_limit', value: '5' },
    { key: 'pro_reports_limit', value: '25' },
    { key: 'premium_reports_limit', value: '100' },
    { key: 'free_trial_days', value: '7' },
    { key: 'support_email', value: 'support@jyotishai.com' },
  ]

  for (const setting of systemSettings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Created admin user: ${admin.email}`)
  console.log(`👤 Created test user: ${testUser.email}`)
  console.log(`⚙️ Created ${systemSettings.length} system settings`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })