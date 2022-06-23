import { SubscriptionPriceDto } from "~/application/dtos/core/subscriptions/SubscriptionPriceDto";
import { SubscriptionProductDto } from "~/application/dtos/core/subscriptions/SubscriptionProductDto";
import { SubscriptionBillingPeriod } from "~/application/enums/subscriptions/SubscriptionBillingPeriod";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface Props {
  onSelected?: () => void;
}

export default function BillingPeriodToggle({ onSelected }: Props) {
  const { t } = useTranslation();

  function changeInterval(billingPeriod: SubscriptionBillingPeriod) {
    // store.dispatch(setBillingPeriod(billingPeriod));
    if (onSelected) {
      onSelected();
    }
  }
  function billingPeriodName(billingPeriod: SubscriptionBillingPeriod): string {
    return t("pricing." + SubscriptionBillingPeriod[billingPeriod].toString()).toString();
  }
  function isYearly(billingPeriod: SubscriptionBillingPeriod): boolean {
    return billingPeriod === SubscriptionBillingPeriod.YEARLY;
  }
  function yearlyDiscount(): string | undefined {
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
      products.forEach((product: SubscriptionProductDto) => {
        const prices = product.prices.find((f) => f.billingPeriod === billingPeriod && f.currency === currency && f.price > 0);
        if (prices) {
          price = prices;
        }
      });
    }
    return price;
  }
  function billingPeriods() {
    const allBillingPeriods: SubscriptionBillingPeriod[] = [];
    function onlyUnique(value: SubscriptionBillingPeriod, index: number, self: SubscriptionBillingPeriod[]) {
      return self.indexOf(value) === index;
    }

    products.forEach((element: SubscriptionProductDto) => {
      element.prices.forEach((price) => {
        if (currency === price.currency && price.billingPeriod !== SubscriptionBillingPeriod.ONCE) {
          allBillingPeriods.push(price.billingPeriod);
        }
      });
    });
    return allBillingPeriods.filter(onlyUnique);
  }
  // const billingPeriod = useSelector((state: RootState) => state.pricing.billingPeriod);

  // const currency = useSelector((state: RootState) => state.pricing.currency);
  // const products = useSelector((state: RootState): SubscriptionProductDto[] => {
  //   return state.pricing.products as SubscriptionProductDto[];
  // });

  return (
    <div className="w-full flex justify-center mb-0">
      <div className="flex justify-center" v-if="billingPeriods.length > 0">
        {billingPeriods().map((period, idx) => {
          return (
            <button
              type="button"
              key={idx}
              onClick={() => changeInterval(period)}
              className={clsx(
                "border border-slate-200 dark:border-gray-700 uppercase py-1 flex justify-center w-36 sm:w-32 items-center space-x-2",
                billingPeriod !== period
                  ? "text-xs p-4 cursor-pointer bg-gray-50 dark:bg-gray-700"
                  : "text-xs p-4 cursor-pointer bg-white dark:bg-gray-900 border shadow-md border-slate-300 dark:border-gray-600",
                idx === 0 ? "rounded-l-md border-r-none" : "rounded-r-md border-l-none"
              )}
            >
              <div>{billingPeriodName(period)}</div>
              {isYearly(period) && yearlyDiscount() && (
                <div className="text-right bg-green-200 text-green-600 ml-1 flex content-center items-center justify-center rounded-sm p-1 text-xs px-2 cursor-pointer font-semibold">
                  {yearlyDiscount()}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
