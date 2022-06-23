import clsx from "clsx";
import { t } from "i18next";
import { SubscriptionFeatureDto } from "~/application/dtos/subscriptions/SubscriptionFeatureDto";
import { PricingModel } from "~/application/enums/subscriptions/PricingModel";
import { SubscriptionBillingPeriod } from "~/application/enums/subscriptions/SubscriptionBillingPeriod";
import { SubscriptionFeatureLimitType } from "~/application/enums/subscriptions/SubscriptionFeatureLimitType";

interface Props {
  title: string;
  description: string;
  badge: string;
  features: SubscriptionFeatureDto[];
  billingPeriod: SubscriptionBillingPeriod;
  price: string;
  currency: string;
  model: PricingModel;
}

export default function Plan({ title, description, badge, features, billingPeriod, price, model }: Props) {
  return (
    <div>
      <section
        className={clsx(
          "relative flex flex-col w-full p-12 rounded-lg shadow-xl",
          !badge && "border border-theme-100 dark:border-theme-800",
          badge && "border-2 border-theme-400 dark:border-theme-600"
        )}
      >
        {badge && (
          <div className="absolute top-0 py-1.5 px-4 bg-theme-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
            {t(badge)}
          </div>
        )}
        <div className="flex-1 space-y-6">
          {/* Price */}
          <div className="flex-shrink-0">
            <span className="text-4xl font-medium tracking-tight pr-1">{price}</span>
            {model === PricingModel.PER_SEAT && <span className="text-gray-500">/{t("pricing.seat").toLowerCase()}</span>}
            {(() => {
              if (billingPeriod === 3) {
                return <span className="text-gray-500">/{t("pricing.MONTHLYShort")}</span>;
              } else {
                return <span className="text-gray-500">/{t("pricing.YEARLYShort")}</span>;
              }
            })()}
          </div>

          {/* Badge */}
          <div className="flex-shrink-0 pb-6 space-y-2 border-b">
            <h2 className="text-2xl font-normal">{t(title)}</h2>
            <p className="text-sm text-gray-500">{t(description)}</p>
          </div>

          {/* Features */}
          <ul className="flex-1 space-y-4">
            {features
              .sort((a, b) => (a.order > b.order ? 1 : -1))
              .map((feature, idxFeature) => {
                return (
                  <li key={idxFeature}>
                    <div className="flex items-center">
                      {feature.type !== SubscriptionFeatureLimitType.NOT_INCLUDED ? (
                        <svg className="w-5 h-5 text-theme-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" stroke="#FFFFF" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span className="ml-3 text-base font-medium truncate">
                        <span>{t(feature.title, [feature.value])}</span>
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </div>
  );
}
