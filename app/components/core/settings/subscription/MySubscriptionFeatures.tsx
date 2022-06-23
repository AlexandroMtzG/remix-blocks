import { useTranslation } from "react-i18next";
import clsx from "clsx";
import MyPlanFeatureUsage from "./MyPlanFeatureUsage";
import { PlanFeatureUsageDto } from "~/application/dtos/subscriptions/PlanFeatureUsageDto";

interface Props {
  features: PlanFeatureUsageDto[];
  className?: string;
  withCurrentPlan: boolean;
  cols?: string;
}

export default function MySubscriptionFeatures({
  features,
  className = "",
  withCurrentPlan = false,
  cols = "grid-cols-2 sm:grid-cols-2 xl:grid-cols-2",
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      {features.length > 0 && (
        <>
          <div className="grid lg:grid-cols-2 gap-6 md:gap-2 mb-4">
            <div className="md:col-span-1">
              <div className="sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{t("app.subscription.features.title")}</h3>

                <div className="mt-1 text-sm leading-5 text-gray-600">{t("app.subscription.features.description")}</div>
              </div>
            </div>
          </div>

          <div>
            <dl
              className={clsx(
                "grid gap-5",
                withCurrentPlan && "mt-2 ",
                features.length === 1 && "grid-cols-1 md:grid-cols-1 xl:grid-cols-1",
                features.length === 2 && "grid-cols-1 md:grid-cols-1 xl:grid-cols-2",
                features.length === 3 && "grid-cols-1 md:grid-cols-1 xl:grid-cols-3",
                features.length === 4 && "grid-cols-1 md:grid-cols-1 xl:grid-cols-4",
                features.length === 5 && "grid-cols-1 md:grid-cols-1 xl:grid-cols-5",
                features.length === 6 && "grid-cols-1 md:grid-cols-3 xl:grid-cols-6"
              )}
            >
              {features.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    // to={UrlUtils.currentTenantUrl(params, "settings/members")}
                    className={clsx("bg-white px-4 py-5 border border-gray-300 shadow-md rounded-lg overflow-hidden sm:p-6")}
                  >
                    <dt className="text-sm font-medium text-gray-500 truncate capitalize">{item.name}</dt>
                    <dd className="mt-1">
                      <span>{<MyPlanFeatureUsage item={item} />}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </>
      )}
    </div>
  );
}
