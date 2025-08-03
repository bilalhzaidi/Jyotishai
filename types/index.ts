import { User, Report, Payment, SubscriptionPlan, SubscriptionStatus, ReportType, Gender, UserRole } from '@prisma/client'

// Extended User type with relations
export type UserWithDetails = User & {
  reports: Report[]
  payments: Payment[]
  _count: {
    reports: number
    payments: number
  }
}

// Report types
export type ReportWithUser = Report & {
  user: Pick<User, 'id' | 'name' | 'email'>
}

export type CreateReportData = {
  birthDate: Date
  birthTime: string
  birthPlace: string
  gender: Gender
  reportType: ReportType
}

// Payment types
export type PaymentWithUser = Payment & {
  user: Pick<User, 'id' | 'name' | 'email'>
}

// Dashboard types
export type DashboardStats = {
  totalUsers: number
  activeSubscriptions: number
  totalReports: number
  monthlyRevenue: number
  recentUsers: UserWithDetails[]
  recentReports: ReportWithUser[]
  recentPayments: PaymentWithUser[]
}

// Form types
export type ProfileFormData = {
  firstName: string
  lastName: string
  dateOfBirth?: Date
  timeOfBirth?: string
  placeOfBirth?: string
  gender?: Gender
}

export type BirthDetailsFormData = {
  birthDate: Date
  birthTime: string
  birthPlace: string
  gender: Gender
}

// API Response types
export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T> = {
  items: T[]
  totalCount: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// Subscription types
export type SubscriptionInfo = {
  plan: SubscriptionPlan | null
  status: SubscriptionStatus
  reportsUsed: number
  reportsLimit: number
  subscriptionStart?: Date
  subscriptionEnd?: Date
}

// Chart/Analysis types
export type PlanetPosition = {
  planet: string
  sign: string
  degree: number
  house: number
  retrograde?: boolean
}

export type HouseData = {
  house: number
  sign: string
  lord: string
  planets: string[]
}

export type AstrologyChart = {
  planets: PlanetPosition[]
  houses: HouseData[]
  ascendant: string
  moonSign: string
  sunSign: string
}

// Navigation types
export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
    }
)

// Export Prisma types for convenience
export {
  User,
  Report,
  Payment,
  SubscriptionPlan,
  SubscriptionStatus,
  ReportType,
  Gender,
  UserRole,
  BillingPeriod,
  PaymentStatus,
} from '@prisma/client'