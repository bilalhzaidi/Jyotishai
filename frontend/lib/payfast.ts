import crypto from 'crypto'
import { SubscriptionPlan, BillingPeriod } from '@prisma/client'

export interface PayFastConfig {
  merchantId: string
  merchantKey: string
  passphrase: string
  sandbox: boolean
}

export interface PayFastPaymentData {
  merchant_id: string
  merchant_key: string
  return_url: string
  cancel_url: string
  notify_url: string
  name_first: string
  name_last: string
  email_address: string
  m_payment_id: string
  amount: string
  item_name: string
  item_description: string
  subscription_type: string
  recurring_amount: string
  frequency: string
  cycles: string
}

export class PayFastService {
  private config: PayFastConfig

  constructor() {
    this.config = {
      merchantId: process.env.PAYFAST_MERCHANT_ID!,
      merchantKey: process.env.PAYFAST_MERCHANT_KEY!,
      passphrase: process.env.PAYFAST_PASSPHRASE!,
      sandbox: process.env.PAYFAST_SANDBOX === 'true',
    }
  }

  getPaymentUrl(): string {
    return this.config.sandbox
      ? 'https://sandbox.payfast.co.za/eng/process'
      : 'https://www.payfast.co.za/eng/process'
  }

  generateSignature(data: Record<string, string>): string {
    // Remove signature if it exists
    const { signature, ...dataToSign } = data

    // Create parameter string
    const paramString = Object.keys(dataToSign)
      .sort()
      .map(key => `${key}=${encodeURIComponent(dataToSign[key]).replace(/%20/g, '+')}`)
      .join('&')

    // Add passphrase if it exists
    const stringToSign = this.config.passphrase
      ? `${paramString}&passphrase=${encodeURIComponent(this.config.passphrase)}`
      : paramString

    // Generate signature
    return crypto.createHash('md5').update(stringToSign).digest('hex')
  }

  createSubscriptionPayment(
    userId: string,
    plan: SubscriptionPlan,
    billingPeriod: BillingPeriod,
    userDetails: {
      firstName: string
      lastName: string
      email: string
    }
  ): PayFastPaymentData {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000'
    const amount = this.getPlanAmount(plan, billingPeriod)
    const frequency = billingPeriod === BillingPeriod.MONTHLY ? '3' : '6' // Monthly or Yearly
    
    const paymentData: PayFastPaymentData = {
      merchant_id: this.config.merchantId,
      merchant_key: this.config.merchantKey,
      return_url: `${baseUrl}/payment/success`,
      cancel_url: `${baseUrl}/payment/cancelled`,
      notify_url: `${baseUrl}/api/webhooks/payfast`,
      name_first: userDetails.firstName,
      name_last: userDetails.lastName,
      email_address: userDetails.email,
      m_payment_id: `${userId}-${plan}-${Date.now()}`,
      amount: amount.toString(),
      item_name: `${plan} Plan - ${billingPeriod}`,
      item_description: `Jyotishai ${plan} subscription - ${billingPeriod} billing`,
      subscription_type: '1',
      recurring_amount: amount.toString(),
      frequency: frequency,
      cycles: '0', // Infinite cycles
    }

    return paymentData
  }

  createPaymentForm(paymentData: PayFastPaymentData): string {
    const signature = this.generateSignature(paymentData)
    const paymentUrl = this.getPaymentUrl()

    let form = `<form action="${paymentUrl}" method="post" id="payfast-form">`
    
    Object.entries(paymentData).forEach(([key, value]) => {
      form += `<input type="hidden" name="${key}" value="${value}" />`
    })
    
    form += `<input type="hidden" name="signature" value="${signature}" />`
    form += `<input type="submit" value="Pay Now" />`
    form += `</form>`

    return form
  }

  verifySignature(data: Record<string, string>): boolean {
    const receivedSignature = data.signature
    const calculatedSignature = this.generateSignature(data)
    
    return receivedSignature === calculatedSignature
  }

  private getPlanAmount(plan: SubscriptionPlan, billingPeriod: BillingPeriod): number {
    const monthlyPrices = {
      [SubscriptionPlan.BASIC]: 99,
      [SubscriptionPlan.PRO]: 199,
      [SubscriptionPlan.PREMIUM]: 299,
    }

    const monthlyPrice = monthlyPrices[plan]
    
    if (billingPeriod === BillingPeriod.YEARLY) {
      // 2 months free on yearly billing
      return Math.round(monthlyPrice * 10)
    }
    
    return monthlyPrice
  }

  async handleWebhookNotification(data: Record<string, string>): Promise<{
    valid: boolean
    paymentId?: string
    status?: string
    amount?: number
  }> {
    try {
      // Verify signature
      if (!this.verifySignature(data)) {
        return { valid: false }
      }

      // Verify payment status
      const isValidStatus = ['COMPLETE', 'CANCELLED', 'FAILED'].includes(data.payment_status)
      
      if (!isValidStatus) {
        return { valid: false }
      }

      return {
        valid: true,
        paymentId: data.m_payment_id,
        status: data.payment_status,
        amount: parseFloat(data.amount_gross || '0'),
      }
    } catch (error) {
      console.error('PayFast webhook verification error:', error)
      return { valid: false }
    }
  }
}