import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { SubscriptionBillingPeriod } from "~/application/enums/subscriptions/SubscriptionBillingPeriod";

interface Props {
  className?: string;
  billingPeriod: SubscriptionBillingPeriod;
  toggleBillingPeriod: () => void;
  yearlyDiscount: string | undefined;
  size?: "sm" | "md";
  disabled?: boolean;
}

export default function ToggleBillingPeriod({ className, billingPeriod, toggleBillingPeriod, yearlyDiscount, size = "md", disabled }: Props) {
  const { t } = useTranslation();
  return (
    <div className={clsx("flex items-center justify-center space-x-4", className)}>
      <span className="font-medium">{t("pricing.MONTHLY")}</span>
      <button
        disabled={disabled}
        type="button"
        className={clsx(
          "relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500",
          disabled && "opacity-80 cursor-not-allowed"
        )}
        onClick={toggleBillingPeriod}
      >
        <div className={clsx("transition bg-theme-500 rounded-full shadow-md outline-none", size === "sm" && "w-8 h-4", size === "md" && "w-16 h-8")}></div>
        <div
          className={clsx(
            "absolute inline-flex bg-white items-center justify-center transition-all duration-200 ease-in-out transform rounded-full shadow-sm top-1 left-1",
            size === "sm" && "w-2 h-2",
            size === "md" && "w-6 h-6",
            billingPeriod === 3 && "translate-x-0",
            billingPeriod === 4 && size === "sm" && "translate-x-4",
            billingPeriod === 4 && size === "md" && "translate-x-8"
          )}
        ></div>
      </button>
      <span className="font-medium">
        {t("pricing.YEARLY")}{" "}
        {yearlyDiscount && (
          <span className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-teal-100 text-teal-800">{yearlyDiscount}</span>
        )}
      </span>
    </div>
  );
}
