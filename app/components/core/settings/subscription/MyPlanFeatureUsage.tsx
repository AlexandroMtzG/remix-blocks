import { useTranslation } from "react-i18next";
import { PlanFeatureUsageDto } from "~/application/dtos/subscriptions/PlanFeatureUsageDto";
import { SubscriptionFeatureLimitType } from "~/application/enums/subscriptions/SubscriptionFeatureLimitType";

interface Props {
  item: PlanFeatureUsageDto | undefined;
}
export default function MyPlanFeatureUsage({ item }: Props) {
  const { t } = useTranslation();
  return (
    <div>
      {item ? (
        <div>
          {/* {JSON.stringify(item)} */}

          <div className="flex space-x-1 items-baseline text-xl font-medium">
            {item.type === SubscriptionFeatureLimitType.INCLUDED && (
              <span className="flex space-x-1 items-center text-sm md:text-lg truncate text-gray-800">
                {/* <CheckIcon className={clsx(" text-center h-5 w-5")} /> */}
                <span>Included</span>
              </span>
            )}
            {item.type === SubscriptionFeatureLimitType.NOT_INCLUDED && (
              <span className="flex space-x-1 items-center text-sm md:text-lg truncate text-gray-500">
                {/* <XIcon className={clsx(" text-center h-5 w-5")} /> */}
                <span>Not included</span>
              </span>
            )}
            {item.type === SubscriptionFeatureLimitType.MONTHLY && (
              <span className="text-gray-800 lowercase flex space-x-1 items-baseline">
                <span>
                  {item.used}/{item.value}
                </span>
                <span className="font-normal italic text-gray-400 text-sm">(this month)</span>
              </span>
            )}
            {item.type === SubscriptionFeatureLimitType.MAX && (
              <span className="text-gray-800 lowercase">
                {item.used}/{item.value}
              </span>
            )}
            {item.type === SubscriptionFeatureLimitType.UNLIMITED && (
              <span className="flex space-x-1 items-center text-sm md:text-lg truncate text-gray-800">{t("shared.unlimited")}</span>
            )}
          </div>
          {/* <span className="mt-2 text-red-700 text-xs font-normal">{item.message ?? ""}</span> */}
        </div>
      ) : (
        <span className=" text-gray-500">-</span>
      )}
    </div>
  );
}
