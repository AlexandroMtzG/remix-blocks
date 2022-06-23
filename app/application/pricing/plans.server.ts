import { SubscriptionBillingPeriod } from "~/application/enums/subscriptions/SubscriptionBillingPeriod";
import { SubscriptionPriceType } from "~/application/enums/subscriptions/SubscriptionPriceType";
import { SubscriptionProductDto } from "../dtos/subscriptions/SubscriptionProductDto";
import { PricingModel } from "../enums/subscriptions/PricingModel";
import { SubscriptionFeatureLimitType } from "../enums/subscriptions/SubscriptionFeatureLimitType";

const currency = "usd";
const plans: SubscriptionProductDto[] = [
  {
    stripeId: "",
    order: 1,
    title: "pricing.products.plan1.title",
    description: "pricing.products.plan1.description",
    model: PricingModel.FLAT_RATE,
    public: true,
    prices: [
      {
        stripeId: "",
        subscriptionProductId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 0,
        currency,
        trialDays: 0,
        active: true,
      },
      {
        stripeId: "",
        subscriptionProductId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 0,
        currency,
        trialDays: 0,
        active: true,
      },
    ],
    features: [
      {
        order: 1,
        title: "2 users",
        name: "user",
        value: 2,
        type: SubscriptionFeatureLimitType.MAX,
      },
      {
        order: 2,
        title: "1 contract",
        name: "contract",
        value: 1,
        type: SubscriptionFeatureLimitType.MAX,
      },
      {
        order: 3,
        title: "Priority support",
        name: "priority-support",
        value: 0,
        type: SubscriptionFeatureLimitType.NOT_INCLUDED,
      },
    ],
    badge: "",
    active: true,
  },
  {
    stripeId: "",
    order: 2,
    title: "pricing.products.plan2.title",
    description: "pricing.products.plan2.description",
    public: true,
    model: PricingModel.FLAT_RATE,
    prices: [
      {
        stripeId: "",
        subscriptionProductId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 199,
        currency,
        trialDays: 30,
        active: true,
      },
      {
        stripeId: "",
        subscriptionProductId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 1999,
        currency,
        trialDays: 0,
        active: true,
      },
    ],
    features: [
      {
        order: 1,
        title: "5 users",
        name: "user",
        value: 5,
        type: SubscriptionFeatureLimitType.MAX,
      },
      {
        order: 2,
        title: "45 contracts/month",
        name: "contract",
        value: 45,
        type: SubscriptionFeatureLimitType.MONTHLY,
      },
      {
        order: 3,
        title: "Priority support",
        name: "priority-support",
        value: 0,
        type: SubscriptionFeatureLimitType.NOT_INCLUDED,
      },
    ],
    badge: "pricing.recommended",
    active: true,
  },
  {
    stripeId: "",
    order: 3,
    title: "pricing.products.plan3.title",
    description: "pricing.products.plan3.description",
    public: true,
    model: PricingModel.FLAT_RATE,
    prices: [
      {
        stripeId: "",
        subscriptionProductId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.MONTHLY,
        price: 399,
        currency,
        trialDays: 30,
        active: true,
      },
      {
        stripeId: "",
        subscriptionProductId: "",
        type: SubscriptionPriceType.RECURRING,
        billingPeriod: SubscriptionBillingPeriod.YEARLY,
        price: 3999,
        currency,
        trialDays: 0,
        active: true,
      },
    ],
    features: [
      {
        order: 1,
        title: "12 users",
        name: "user",
        value: 12,
        type: SubscriptionFeatureLimitType.MAX,
      },
      {
        order: 2,
        title: "90 contracts/month",
        name: "contract",
        value: 90,
        type: SubscriptionFeatureLimitType.MONTHLY,
      },
      {
        order: 3,
        title: "Priority support",
        name: "priority-support",
        value: 0,
        type: SubscriptionFeatureLimitType.INCLUDED,
      },
    ],
    badge: "",
    active: true,
  },
];

export default plans;
