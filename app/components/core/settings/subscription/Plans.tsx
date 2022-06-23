import { SubscriptionBillingPeriod } from "~/application/enums/subscriptions/SubscriptionBillingPeriod";
import clsx from "~/utils/shared/ClassesUtils";
import NumberUtils from "~/utils/shared/NumberUtils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";
import WarningBanner from "~/components/ui/banners/WarningBanner";
import { SubscriptionPriceDto } from "~/application/dtos/subscriptions/SubscriptionPriceDto";
import { SubscriptionProductDto } from "~/application/dtos/subscriptions/SubscriptionProductDto";
import Plan from "./Plan";
import ToggleBillingPeriod from "./ToggleBillingPeriod";

interface Props {
  items: SubscriptionProductDto[];
}
export default function Plans({ items }: Props) {
  const { t } = useTranslation();

  const [products] = useState(items);
  const [testProducts] = useState(!items || items.filter((f) => f.id === undefined || f.id === "").length > 0);

  const [billingPeriod, setBillingPeriod] = useState<SubscriptionBillingPeriod>(SubscriptionBillingPeriod.MONTHLY);
  const [currency] = useState("usd");

  function toggleBillingPeriod() {
    if (billingPeriod === SubscriptionBillingPeriod.MONTHLY) {
      setBillingPeriod(SubscriptionBillingPeriod.YEARLY);
    } else {
      setBillingPeriod(SubscriptionBillingPeriod.MONTHLY);
    }
  }

  function getPrice(product: SubscriptionProductDto): SubscriptionPriceDto | undefined {
    const prices = product.prices.find(
      (f) => (f.billingPeriod === billingPeriod || f.billingPeriod === SubscriptionBillingPeriod.ONCE) && f.currency === currency && f.active
    );
    return prices;
  }
  function getPriceAmount(product: SubscriptionProductDto): number {
    return getPrice(product)?.price ?? 0;
  }
  function intFormat(value: number) {
    return NumberUtils.intFormat(value);
  }

  function getYearlyDiscount(): string | undefined {
    const priceYearly = getPriceWithInterval(SubscriptionBillingPeriod.YEARLY);
    const priceMonthly = getPriceWithInterval(SubscriptionBillingPeriod.MONTHLY);
    if (priceYearly && priceMonthly) {
      const discount = 100 - (priceYearly.price * 100) / (priceMonthly.price * 12);
      if (discount !== 0) {
        return "-" + discount.toFixed(0) + "%";
      }
    }

    return undefined;
  }
  function getPriceWithInterval(billingPeriod: SubscriptionBillingPeriod): SubscriptionPriceDto | undefined {
    let price: SubscriptionPriceDto | undefined;
    if (products && products.length > 0) {
      products.forEach((product) => {
        const prices = product.prices.find((f) => f.billingPeriod === billingPeriod && f.currency === currency && f.price > 0);
        if (prices) {
          price = prices;
        }
      });
    }
    return price;
  }

  return (
    <div>
      <div className="container mx-auto antialiased">
        <main className="lg:mx-4">
          <ToggleBillingPeriod className="mt-10" billingPeriod={billingPeriod} toggleBillingPeriod={toggleBillingPeriod} yearlyDiscount={getYearlyDiscount()} />

          <div className="space-y-6">
            {testProducts && <WarningBanner redirect="/admin/setup/pricing" title={t("shared.warning")} text={t("admin.pricing.thesePricesAreFromFiles")} />}

            <div className={clsx("mt-16 grid gap-6 lg:gap-3", products.length === 2 && "lg:grid-cols-2", products.length > 2 && "lg:grid-cols-3")}>
              {products.map((plan, index) => {
                return (
                  <Plan
                    key={index}
                    title={plan.title}
                    description={plan.description}
                    badge={plan.badge}
                    features={plan.features}
                    billingPeriod={billingPeriod}
                    currency={currency}
                    price={intFormat(getPriceAmount(plan))}
                    model={plan.model}
                  />
                );
              })}
            </div>

            {/* Contact Us */}
            <div className="relative">
              <div>
                <div className="mx-auto rounded-lg shadow-xl border border-transparent overflow-hidden lg:flex">
                  <div className="flex-1 bg-slate-800 dark:bg-theme-800 px-6 py-8 lg:p-12">
                    <h3 className="text-2xl font-extrabold text-white sm:text-3xl">{t("pricing.custom.title")}</h3>
                    <p className="mt-6 text-base text-white">{t("pricing.custom.description")}</p>
                    <div className="mt-8">
                      <div className="flex items-center">
                        <h4 className="flex-shrink-0 pr-4 text-sm tracking-wider font-semibold uppercase text-white">{t("pricing.whatsIncluded")}</h4>
                        <div className="flex-1 border-t dark:border-gray-300 border-gray-700"></div>
                      </div>
                      <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                        <li className="flex items-start lg:col-span-1">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-theme-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-50">
                            <span>{t("pricing.features.maxUsers", ["12+"])}</span>
                          </p>
                        </li>
                        <li className="flex items-start lg:col-span-1">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-theme-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-50">
                            <span>{t("pricing.features.maxContracts", ["90+"])}</span>
                          </p>
                        </li>
                        <li className="flex items-start lg:col-span-1">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-theme-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-50">
                            <span>{t("pricing.features.prioritySupport")}</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="py-8 px-6 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                    <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-white">
                      <span>{t("pricing.contactUs")}</span>
                    </div>
                    <p className="mt-4 text-sm">
                      <span className="font-medium text-gray-500">{t("pricing.customPlanDescription")}</span>
                    </p>
                    <div className="mt-6">
                      <div className="rounded-md shadow max-w-md mx-auto">
                        <Link
                          to="/contact"
                          className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900"
                        >
                          {t("pricing.contact")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Contact Us */}
          </div>
        </main>
      </div>
    </div>
  );
}
