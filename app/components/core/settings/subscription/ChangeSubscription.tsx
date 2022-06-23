import { SubscriptionBillingPeriod } from "~/application/enums/subscriptions/SubscriptionBillingPeriod";
import clsx from "~/utils/shared/ClassesUtils";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSubmit, useTransition } from "remix";
import ConfirmModal, { RefConfirmModal } from "~/components/ui/modals/ConfirmModal";
import { getAllSubscriptionProducts } from "~/utils/db/subscriptionProducts.db.server";
import { SubscriptionProductDto } from "~/application/dtos/subscriptions/SubscriptionProductDto";
import { SubscriptionPriceDto } from "~/application/dtos/subscriptions/SubscriptionPriceDto";
import { PricingModel } from "~/application/enums/subscriptions/PricingModel";
import { SubscriptionFeatureLimitType } from "~/application/enums/subscriptions/SubscriptionFeatureLimitType";
import InputNumber from "~/components/ui/input/InputNumber";
import { TenantSubscriptionWithDetails } from "~/utils/db/tenantSubscriptions.db.server";
import Modal from "~/components/ui/modals/Modal";
import LoadingButton from "~/components/ui/buttons/LoadingButton";

interface Props {
  current: TenantSubscriptionWithDetails | null;
  items: Awaited<ReturnType<typeof getAllSubscriptionProducts>>;
  billingPeriod: SubscriptionBillingPeriod;
  currency: string;
}
export default function ChangeSubscription({ items, current, billingPeriod, currency }: Props) {
  const { t } = useTranslation();
  const transition = useTransition();
  const loading = transition.state === "submitting";
  const submit = useSubmit();

  const confirmModal = useRef<RefConfirmModal>(null);

  const [showQuantityModal, setShowQuantityModal] = useState(false);

  const [products] = useState(items.filter((f) => f.public));
  const [quantity, setQuantity] = useState(1);

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionProductDto>();

  useEffect(() => {
    setQuantity(((current?.quantity ?? 0) > 0 ? current?.quantity : 1) ?? 1);
  }, [current]);

  function getPrice(product: SubscriptionProductDto): SubscriptionPriceDto | undefined {
    const prices = product.prices.find(
      (f) => (f.billingPeriod === billingPeriod || f.billingPeriod === SubscriptionBillingPeriod.ONCE) && f.currency === currency && f.active
    );
    return prices;
  }
  function getPriceAmount(product: SubscriptionProductDto): number {
    return getPrice(product)?.price ?? 0;
  }

  function selectPrice(product: SubscriptionProductDto) {
    const price = getPrice(product);
    if (!price || !price.id) {
      return;
    }
    setSelectedPlan(product);
    if (product.model === PricingModel.PER_SEAT) {
      setShowQuantityModal(true);
    } else if (!isCurrent(product)) {
      const form = new FormData();
      form.set("action", "subscribe");
      form.set("price-id", price.id);
      submit(form, {
        method: "post",
      });
    } else {
      cancel();
    }
  }

  function confirmedQuantity() {
    if (!selectedPlan) {
      return;
    }
    const price = getPrice(selectedPlan);
    if (!price || !price.id) {
      return;
    }
    const form = new FormData();
    form.set("action", "subscribe");
    form.set("quantity", quantity.toString());
    form.set("price-id", price.id);
    submit(form, {
      method: "post",
    });
  }

  function isCurrent(plan: SubscriptionProductDto) {
    return current?.subscriptionPrice?.subscriptionProduct?.id === plan.id;
  }
  function getButtonTitle(plan: SubscriptionProductDto, withSeats: boolean = false) {
    if (isCurrent(plan)) {
      return t("shared.subscribed");
    }
    const subscriptionPrice = getPrice(plan);
    if (withSeats && plan.model === PricingModel.PER_SEAT && subscriptionPrice) {
      const billingPeriodDescription = billingPeriod === 3 ? t("pricing.MONTHLYShort") : t("pricing.YEARLYShort");
      return t("pricing.subscribe") + " " + t(plan.title) + " $" + subscriptionPrice.price * quantity + "/" + billingPeriodDescription;
    }
    if (current?.subscriptionPrice) {
      return isUpgrade(plan) ? t("shared.upgrade") : t("shared.downgrade");
    }
    return t("pricing.subscribe");
  }

  function isDowngrade(plan: SubscriptionProductDto) {
    if (current) {
      return plan.order < (current.subscriptionPrice?.subscriptionProduct.order ?? 0);
    }
    return false;
  }

  function isUpgrade(plan: SubscriptionProductDto) {
    if (!current) {
      return true;
    }
    return plan.order > (current.subscriptionPrice?.subscriptionProduct.order ?? 0);
  }

  function cancel() {
    confirmModal.current?.show(t("settings.subscription.confirmCancel"));
  }
  function confirmCancel() {
    const form = new FormData();
    form.set("action", "cancel");
    submit(form, {
      method: "post",
    });
  }

  return (
    <div>
      <div className="container mx-auto antialiased mt-6">
        <main className="">
          <div className="space-y-2">
            <div className={clsx("mt-6 grid gap-4 lg:gap-2", products.length === 2 && "lg:grid-cols-2", products.length > 2 && "lg:grid-cols-3")}>
              {products
                .filter((f) => f.public)
                .map((plan, index) => {
                  return (
                    <div key={index}>
                      <section
                        className={clsx(
                          "relative flex flex-col w-full p-6 rounded-md shadow-sm",
                          !isCurrent(plan) && "border border-teal-800",
                          isCurrent(plan) && "border-2 border-teal-600"
                        )}
                      >
                        {isCurrent(plan) && (
                          <div className="absolute top-0 py-1.5 px-4 bg-teal-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                            {t("shared.current")}
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          {/* Price */}
                          <div className="flex-shrink-0 truncate">
                            <span className="text-2xl font-medium tracking-tight">${getPriceAmount(plan)}</span>
                            {plan.model === PricingModel.PER_SEAT && <span className="text-gray-500">/{t("pricing.seat").toLowerCase()}</span>}
                            {(() => {
                              if (billingPeriod === 3) {
                                return <span className="text-gray-500">/{t("pricing.MONTHLYShort")}</span>;
                              } else {
                                return <span className="text-gray-500">/{t("pricing.YEARLYShort")}</span>;
                              }
                            })()}
                          </div>

                          {/* Badge */}
                          <div className="flex-shrink-0 pb-3 space-y-2 border-b">
                            <h2 className="text-lg font-normal">{t(plan.title)}</h2>
                          </div>

                          {/* Features */}
                          <ul className="flex-1 space-y-1">
                            {plan.features
                              .sort((a, b) => (a.order > b.order ? 1 : -1))
                              .map((feature, idxFeature) => {
                                return (
                                  <li key={idxFeature}>
                                    <div className="flex items-center">
                                      {feature.type !== SubscriptionFeatureLimitType.NOT_INCLUDED ? (
                                        <svg
                                          className="w-4 h-4 text-theme-500 opacity-70"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-4 h-4 text-gray-300 opacity-70"
                                          viewBox="0 0 20 20"
                                          stroke="#FFFFF"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      )}
                                      <span className="ml-3 text-sm truncate">
                                        <span>{t(feature.title, [feature.value])}</span>
                                      </span>
                                    </div>
                                  </li>
                                );
                              })}
                          </ul>

                          {/* Button */}
                          <div className="flex-shrink-0 pt-4 space-y-2">
                            <button
                              disabled={loading || isCurrent(plan) || !getPrice(plan)?.stripeId}
                              type="button"
                              onClick={() => selectPrice(plan)}
                              className={clsx(
                                "inline-flex items-center justify-center w-full px-4 py-2 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm",
                                loading || isCurrent(plan) || !getPrice(plan)?.stripeId ? "opacity-80" : "hover:bg-gray-100 border-slate-800",
                                isUpgrade(plan) && "hover:text-teal-600",
                                isDowngrade(plan) && "hover:text-red-600"
                              )}
                            >
                              {getButtonTitle(plan)}
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      </div>

      <Modal className="sm:max-w-xs" open={showQuantityModal} setOpen={setShowQuantityModal}>
        <InputNumber name="quantity" title={t("pricing.seats")} value={quantity} setValue={setQuantity} required min={1} />
        {selectedPlan && (
          <LoadingButton disabled={quantity <= 0} className="mt-2 w-full text-center" type="button" onClick={confirmedQuantity}>
            {getButtonTitle(selectedPlan, true)}
          </LoadingButton>
        )}
      </Modal>
      <ConfirmModal ref={confirmModal} onYes={confirmCancel} />
    </div>
  );
}
