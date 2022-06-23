import Stripe from "stripe";
import { SubscriptionBillingPeriod } from "~/application/enums/subscriptions/SubscriptionBillingPeriod";
const stripe = new Stripe(process.env.STRIPE_SK?.toString() ?? "", {
  apiVersion: "2020-08-27",
});

export async function createStripeSession(request: Request, customer: string, price: string, quantity: number) {
  return await stripe.checkout.sessions.create({
    customer,
    success_url: `${request.url}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.url}`,
    line_items: [{ price, quantity }],
    mode: "subscription",
  });
}

export async function createStripeSetupSession(request: Request, customer: string, price: string) {
  return await stripe.checkout.sessions.create({
    customer,
    success_url: `${request.url}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.url}`,
    mode: "setup",
    payment_method_types: ["card"],
  });
}

export async function getStripeSession(id: string) {
  return await stripe.checkout.sessions.retrieve(id);
}

export async function cancelStripeSubscription(subscriptionId: string) {
  return await stripe.subscriptions.del(subscriptionId);
}

export async function getStripeSubscription(id: string) {
  try {
    return await stripe.subscriptions.retrieve(id);
  } catch (e) {
    return null;
  }
}

export async function createStripeSubscription(customer: string, price: string) {
  return await stripe.subscriptions.create({
    customer,
    items: [
      {
        price,
      },
    ],
  });
}

export async function getStripeInvoices(id: string) {
  try {
    return (
      await stripe.invoices.list({
        customer: id,
      })
    ).data;
  } catch (e) {
    return [];
  }
}

export async function createStripeCustomer(email: string, name: string) {
  return await stripe.customers
    .create({
      email,
      name,
    })
    .catch(() => {
      return null;
    });
}

export async function updateStripeCustomerPaymentMethod(id: string, default_payment_method: string) {
  return await stripe.customers.update(id, {
    invoice_settings: { default_payment_method },
  });
}

export async function createStripeProduct(data: { title: string }) {
  return await stripe.products
    .create({
      name: data.title,
    })
    .catch(() => {
      return undefined;
    });
}

export async function updateStripeProduct(id: string, data: { title: string }) {
  return await stripe.products
    .update(id, {
      name: data.title,
    })
    .catch((error) => {
      // console.error(error);
      // ignore
    });
}

export async function createStripePrice(productId: string, data: { billingPeriod: SubscriptionBillingPeriod; price: number; currency: string }) {
  if (!productId) {
    return undefined;
  }
  let interval: "day" | "week" | "month" | "year" = "month";
  switch (data.billingPeriod) {
    case SubscriptionBillingPeriod.MONTHLY:
      interval = "month";
      break;
    case SubscriptionBillingPeriod.WEEKLY:
      interval = "week";
      break;
    case SubscriptionBillingPeriod.YEARLY:
      interval = "year";
      break;
    case SubscriptionBillingPeriod.DAILY:
      interval = "day";
      break;
  }
  return await stripe.prices.create({
    unit_amount: data.price * 100,
    currency: data.currency,
    recurring: { interval },
    product: productId,
    active: true,
  });
}

export async function deleteStripeProduct(productId: string) {
  return await stripe.products.del(productId).catch(() => {
    // ignore
  });
}

export async function updateStripePrice(productId: string, data: { active: boolean }) {
  return await stripe.prices
    .update(productId, {
      active: data.active,
    })
    .catch(() => {
      // ignore
    });
}
