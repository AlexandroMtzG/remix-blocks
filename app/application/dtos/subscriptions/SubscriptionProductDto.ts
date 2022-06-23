import { SubscriptionPriceDto } from "./SubscriptionPriceDto";
import { SubscriptionFeatureDto } from "./SubscriptionFeatureDto";
import { PricingModel } from "~/application/enums/subscriptions/PricingModel";

export interface SubscriptionProductDto {
  id?: string;
  stripeId: string;
  order: number;
  title: string;
  description: string;
  badge: string;
  active: boolean;
  model: PricingModel;
  public: boolean;
  prices: SubscriptionPriceDto[];
  features: SubscriptionFeatureDto[];
  translatedTitle?: string;
}
