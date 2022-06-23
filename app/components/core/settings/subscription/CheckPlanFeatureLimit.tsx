import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "remix";
import { PlanFeatureUsageDto } from "~/application/dtos/subscriptions/PlanFeatureUsageDto";
import WarningBanner from "~/components/ui/banners/WarningBanner";
import UrlUtils from "~/utils/app/UrlUtils";

interface Props {
  item: PlanFeatureUsageDto | undefined;
  children: ReactNode;
}
export default function CheckPlanFeatureLimit({ item, children }: Props) {
  const { t } = useTranslation();
  const params = useParams();
  return (
    <div>
      {/* {JSON.stringify(item)} */}
      {item && !item.enabled ? (
        <>
          <WarningBanner redirect={UrlUtils.currentTenantUrl(params, `settings/subscription`)} title={t("app.subscription.errors.limitReached")} text={``}>
            <div className="mt-2">
              <span>{item.message}</span>
            </div>
          </WarningBanner>
        </>
      ) : (
        children
      )}
    </div>
  );
}
