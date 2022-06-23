import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { SubscriptionFeatureDto } from "~/application/dtos/subscriptions/SubscriptionFeatureDto";
import { SubscriptionFeatureLimitType } from "~/application/enums/subscriptions/SubscriptionFeatureLimitType";
import CheckIcon from "~/components/ui/icons/CheckIcon";
import XIcon from "~/components/ui/icons/XIcon";

interface Props {
  item: SubscriptionFeatureDto | undefined;
}
export default function PlanFeatureValue({ item }: Props) {
  const { t } = useTranslation();
  return (
    <div>
      {item ? (
        <div className="flex space-x-1 items-baseline">
          {item.type === SubscriptionFeatureLimitType.INCLUDED && <CheckIcon className={clsx("text-theme-500 text-center h-4 w-4")} />}
          {item.type === SubscriptionFeatureLimitType.NOT_INCLUDED && <XIcon className={clsx("text-gray-300 text-center h-4 w-4")} />}
          {item.type === SubscriptionFeatureLimitType.MONTHLY && <span className="text-gray-500 lowercase">{item.value}/month</span>}
          {item.type === SubscriptionFeatureLimitType.MAX && <span className="text-gray-500 lowercase">{item.value}</span>}
          {item.type === SubscriptionFeatureLimitType.UNLIMITED && <span className="text-gray-500 lowercase">{t("shared.unlimited")}</span>}
        </div>
      ) : (
        <span className=" text-gray-500">-</span>
      )}
    </div>
  );
}
