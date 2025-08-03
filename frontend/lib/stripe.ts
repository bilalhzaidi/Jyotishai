import Stripe from 'stripe'
import { SubscriptionPlan, BillingPeriod } from '@prisma/client'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const getStripeCustomer = async (email: string, name?: string) => {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  })

  if (customers.data.length > 0) {
    return customers.data[0]
  }

  return await stripe.customers.create({
    email,
    name: name || undefined,
  })
}

export const createCheckoutSession = async (
  customerId: string,
  priceId: string,
  userId: string,
  plan: SubscriptionPlan,
  billingPeriod: BillingPeriod
) => {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'

  return await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/payment/cancelled`,
    metadata: {
      userId,
      plan,
      billingPeriod,
    },
    subscription_data: {
      metadata: {
        userId,
        plan,
        billingPeriod,
      },
    },
  })
}

export const createPortalSession = async (customerId: string) => {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'

  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${baseUrl}/dashboard/billing`,
  })
}

export const getPriceId = (plan: SubscriptionPlan, billingPeriod: BillingPeriod): string => {
  const priceMap = {
    [`${SubscriptionPlan.BASIC}_${BillingPeriod.MONTHLY}`]: process.env.STRIPE_BASIC_MONTHLY_PRICE_ID!,
    [`${SubscriptionPlan.BASIC}_${BillingPeriod.YEARLY}`]: process.env.STRIPE_BASIC_YEARLY_PRICE_ID!,
    [`${SubscriptionPlan.PRO}_${BillingPeriod.MONTHLY}`]: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    [`${SubscriptionPlan.PRO}_${BillingPeriod.YEARLY}`]: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
    [`${SubscriptionPlan.PREMIUM}_${BillingPeriod.MONTHLY}`]: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
    [`${SubscriptionPlan.PREMIUM}_${BillingPeriod.YEARLY}`]: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID!,
  }

  return priceMap[`${plan}_${billingPeriod}`]
}

export const getSubscriptionLimits = (plan: SubscriptionPlan): { reportsLimit: number } => {
  const limitsMap = {
    [SubscriptionPlan.BASIC]: { reportsLimit: 5 },
    [SubscriptionPlan.PRO]: { reportsLimit: 25 },
    [SubscriptionPlan.PREMIUM]: { reportsLimit: 100 },
  }

  return limitsMap[plan]
}