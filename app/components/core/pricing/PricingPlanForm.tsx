import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useNavigate, useSubmit, useTransition } from "remix";
import { SubscriptionFeatureDto } from "~/application/dtos/subscriptions/SubscriptionFeatureDto";
import { SubscriptionProductDto } from "~/application/dtos/subscriptions/SubscriptionProductDto";
import { SubscriptionBillingPeriod } from "~/application/enums/subscriptions/SubscriptionBillingPeriod";
import LoadingButton from "~/components/ui/buttons/LoadingButton";
import InputCheckboxInline from "~/components/ui/input/InputCheckboxInline";
import InputNumber from "~/components/ui/input/InputNumber";
import InputText, { RefInputText } from "~/components/ui/input/InputText";
import ConfirmModal, { RefConfirmModal } from "~/components/ui/modals/ConfirmModal";
import { useAdminData } from "~/utils/data/useAdminData";
import NumberUtils from "~/utils/shared/NumberUtils";
import Plan from "../settings/subscription/Plan";
import ToggleBillingPeriod from "../settings/subscription/ToggleBillingPeriod";
import { SubscriptionFeatureLimitType } from "~/application/enums/subscriptions/SubscriptionFeatureLimitType";
import PricingFeaturesTable from "./PricingFeaturesTable";
import { PricingModel } from "~/application/enums/subscriptions/PricingModel";
import InputRadioGroup from "~/components/ui/input/InputRadioGroup";

interface Props {
  plans?: SubscriptionProductDto[];
  item?: SubscriptionProductDto | undefined;
}

export default function PricingPlanForm({ plans, item }: Props) {
  const { t } = useTranslation();
  const transition = useTransition();
  const loading = transition.state === "submitting";
  const navigate = useNavigate();
  const submit = useSubmit();
  const adminData = useAdminData();

  const inputTitle = useRef<RefInputText>(null);
  const confirmRemove = useRef<RefConfirmModal>(null);

  const [order, setOrder] = useState(item?.order ?? getNextOrder());
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [model, setModel] = useState(item?.model ?? PricingModel.FLAT_RATE);
  const [badge, setBadge] = useState(item?.badge ?? "");
  const [isPublic, setIsPublic] = useState(item?.public ?? false);
  const [monthlyPrice, setMonthlyPrice] = useState(getDefaultPrice(SubscriptionBillingPeriod.MONTHLY));
  const [yearlyPrice, setYearlyPrice] = useState(getDefaultPrice(SubscriptionBillingPeriod.YEARLY));
  const [features, setFeatures] = useState<SubscriptionFeatureDto[]>([]);

  const [billingPeriod, setBillingPeriod] = useState<SubscriptionBillingPeriod>(SubscriptionBillingPeriod.MONTHLY);
  const [currency] = useState("usd");

  useEffect(() => {
    inputTitle.current?.input.current?.focus();
    inputTitle.current?.input.current?.select();

    if (item) {
      setFeatures(item.features);
    } else {
      const features: SubscriptionFeatureDto[] = [
        {
          order: 1,
          title: "1 user",
          name: "user",
          type: SubscriptionFeatureLimitType.MAX,
          value: 1,
        },
      ];
      adminData.entities
        .filter((f) => f.active && f.isFeature)
        .forEach((entity) => {
          features.push({
            order: features.length + 1,
            title: "100 " + t(entity.titlePlural).toLowerCase() + "/month",
            name: entity.name,
            type: SubscriptionFeatureLimitType.MONTHLY,
            value: 100,
          });
        });
      features.push({
        order: features.length + 1,
        title: "Priority support",
        name: "priority-support",
        type: SubscriptionFeatureLimitType.NOT_INCLUDED,
        value: 0,
      });
      setFeatures(features);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleBillingPeriod() {
    if (billingPeriod === SubscriptionBillingPeriod.MONTHLY) {
      setBillingPeriod(SubscriptionBillingPeriod.YEARLY);
    } else {
      setBillingPeriod(SubscriptionBillingPeriod.MONTHLY);
    }
  }

  function close() {
    navigate("/admin/setup/pricing", { replace: true });
  }

  function remove() {
    confirmRemove.current?.show(t("shared.confirmDelete"), t("shared.delete"), t("shared.cancel"), t("shared.warningCannotUndo"));
  }
  function getNextOrder() {
    if (!plans || plans?.length === 0) {
      return 1;
    }
    return Math.max(...plans.map((o) => o.order)) + 1;
  }
  function getPrice() {
    if (billingPeriod === SubscriptionBillingPeriod.MONTHLY) {
      return NumberUtils.intFormat(monthlyPrice);
    }
    return NumberUtils.intFormat(yearlyPrice);
  }
  function getDefaultPrice(billingPeriod: SubscriptionBillingPeriod) {
    const subscriptionPrice = item?.prices.find((f) => f.billingPeriod === billingPeriod);
    if (!subscriptionPrice) {
      return 0;
    }
    return subscriptionPrice.price;
  }

  function getYearlyDiscount(): string | undefined {
    if (yearlyPrice && monthlyPrice) {
      const discount = 100 - (yearlyPrice * 100) / (monthlyPrice * 12);
      if (discount > 0) {
        return "- " + discount.toFixed(0) + "% off";
      }
    }
    return undefined;
  }

  function yesRemove() {
    const form = new FormData();
    form.set("action", "delete-plan");
    submit(form, {
      method: "post",
    });
  }

  // function getModelDescription() {
  //   switch (model) {
  //     case PricingModel.FLAT_RATE:
  //       return "eg: Basic $10, Pro $20, Enterprise $30";

  //     case PricingModel.PER_SEAT:
  //       return "Customers can select quantity, eg: $5 per seat.";

  //     case PricingModel.USAGE_BASED:
  //       return "eg: 1$ per contract";

  //     default:
  //       return t("shared.undefined");
  //   }
  // }

  return (
    <>
      <Form method="post" className="lg:py-2 grid grid-cols-2 gap-4 sm:px-4">
        <input hidden readOnly name="action" value={item ? "update-plan" : "create-plan"} />
        <div className="col-span-2 max-w-2xl mx-auto">
          <div className="sm:space-y-4 divide-y divide-gray-200">
            <div className="bg-white py-6 px-8 shadow-lg border border-gray-200 space-y-6">
              <div className="flex items-center space-x-3 justify-between">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">Plan details</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Set a public or custom plan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <InputNumber
                    name="order"
                    title={t("models.subscriptionProduct.order")}
                    value={order}
                    setValue={setOrder}
                    disabled={loading}
                    required={true}
                  />
                </div>
                <div className="sm:col-span-6">
                  <InputText
                    ref={inputTitle}
                    name="title"
                    title={t("models.subscriptionProduct.title")}
                    value={title}
                    setValue={setTitle}
                    disabled={loading}
                    autoComplete="off"
                    minLength={1}
                    maxLength={99}
                    required={true}
                    withTranslation={true}
                    help="You can use i18n keys to translate the Plan title to the current user's language"
                  />
                </div>
                <div className="sm:col-span-3">
                  <InputText
                    name="badge"
                    title={t("models.subscriptionProduct.badge")}
                    value={badge}
                    setValue={setBadge}
                    disabled={loading}
                    autoComplete="off"
                    withTranslation={true}
                  />
                </div>
                {/* <div className="sm:col-span-9">
                  <InputText name="model-description" title={"Model description"} value={getModelDescription()} disabled={true} />
                </div> */}
                <div className="sm:col-span-12">
                  <InputText
                    name="description"
                    title={t("models.subscriptionProduct.description")}
                    value={description}
                    setValue={setDescription}
                    disabled={loading}
                    minLength={1}
                    maxLength={999}
                    autoComplete="off"
                    withTranslation={true}
                  />
                </div>

                <div className="sm:col-span-12">
                  <InputRadioGroup
                    name="model"
                    title={t("models.subscriptionProduct.model")}
                    value={model}
                    setValue={(e) => {
                      setModel(Number(e));
                    }}
                    options={[
                      {
                        name: t("pricing." + PricingModel[PricingModel.FLAT_RATE]),
                        value: PricingModel.FLAT_RATE,
                      },
                      {
                        name: t("pricing." + PricingModel[PricingModel.PER_SEAT]),
                        value: PricingModel.PER_SEAT,
                      },
                      {
                        name: t("pricing." + PricingModel[PricingModel.USAGE_BASED]),
                        value: PricingModel.USAGE_BASED,
                        disabled: true,
                      },
                    ]}
                  />
                  {/* <InputSelect
                    name="model"
                    title={t("models.subscriptionProduct.model")}
                    value={model}
                    setValue={(e) => {
                      setModel(Number(e));
                    }}
                    options={[
                      {
                        name: t("pricing." + PricingModel[PricingModel.FLAT_RATE]),
                        value: PricingModel.FLAT_RATE,
                      },
                      {
                        name: t("pricing." + PricingModel[PricingModel.PER_SEAT]),
                        value: PricingModel.PER_SEAT,
                      },
                      {
                        name: t("pricing." + PricingModel[PricingModel.USAGE_BASED]),
                        value: PricingModel.USAGE_BASED,
                        disabled: true,
                      },
                    ]}
                  /> */}
                </div>
                <div className="sm:col-span-12">
                  <InputCheckboxInline
                    name="is-public"
                    title={t("models.subscriptionProduct.public")}
                    value={isPublic}
                    setValue={setIsPublic}
                    description={
                      <>
                        <span className="font-normal text-gray-500">
                          : is visible to SaaS users at{" "}
                          <a href="/pricing" target="_blank" className=" underline hover:text-theme-500">
                            /pricing
                          </a>
                        </span>
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-white py-6 px-8 shadow-lg border border-gray-200 space-y-6">
              <div className="flex items-center space-x-3 justify-between">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">Prices</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Set the monthly and yearly price</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="col-span-1">
                  <InputNumber
                    name="price-monthly"
                    title={t("pricing.monthlyPrice")}
                    value={monthlyPrice}
                    setValue={setMonthlyPrice}
                    disabled={loading || item !== undefined}
                    min={0}
                    max={99999}
                  />
                </div>

                <div className="col-span-1">
                  <InputNumber
                    name="price-yearly"
                    title={t("pricing.yearlyPrice")}
                    value={yearlyPrice}
                    setValue={setYearlyPrice}
                    disabled={loading || item !== undefined}
                    min={0}
                    max={99999}
                    hint={<>{getYearlyDiscount() && <div className="text-slate-600 font-light italic">{getYearlyDiscount()}</div>}</>}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white py-6 px-8 shadow-lg border border-gray-200 space-y-2">
              <div className="flex items-center space-x-3 justify-between">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">Features</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Set the features</p>
                </div>
              </div>
              {/* <PricingFeaturesForm items={features} setItems={setFeatures} entities={adminData.entities} /> */}
              <PricingFeaturesTable items={features} setItems={setFeatures} />
            </div>

            <div className="bg-white py-6 px-8 shadow-lg border border-gray-200 space-y-6">
              <div className="flex items-center space-x-3 justify-between">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">Preview</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">This is how the plan looks like</p>
                </div>
              </div>

              <div className="">
                <ToggleBillingPeriod
                  className="mt-10"
                  billingPeriod={billingPeriod}
                  toggleBillingPeriod={toggleBillingPeriod}
                  yearlyDiscount={getYearlyDiscount()}
                />
              </div>
              <div className="mt-6">
                <Plan
                  title={title}
                  description={description}
                  badge={badge}
                  features={features}
                  billingPeriod={billingPeriod}
                  currency={currency}
                  price={getPrice()}
                  model={model}
                />
              </div>
            </div>
          </div>

          <div className="py-5 flex justify-between space-x-2">
            <div>
              {item && (
                <button
                  disabled={loading}
                  className={clsx(
                    "inline-flex items-center px-3 py-2 border space-x-2 border-gray-300 shadow-sm sm:text-sm font-medium sm:rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500",
                    loading && "bg-gray-100 cursor-not-allowed"
                  )}
                  type="button"
                  onClick={remove}
                >
                  <div>{t("shared.delete")}</div>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={loading}
                className={clsx(
                  "inline-flex items-center px-3 py-2 border space-x-2 border-gray-300 shadow-sm sm:text-sm font-medium sm:rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500",
                  loading && "bg-gray-100 cursor-not-allowed"
                )}
                type="button"
                onClick={close}
              >
                <div>{t("shared.cancel")}</div>
              </button>
              <LoadingButton
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-theme-600 hover:bg-theme-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500"
              >
                {t("shared.save")}
              </LoadingButton>
            </div>
          </div>
        </div>
        {/* <div className="max-w-2xl mx-auto hidden xl:block">
          <div>
            <div className="space-y-6 fixed top-0 right-0 -mr-52 mt-16 pt-2">
              <div className=" mr-52">
                <ToggleBillingPeriod billingPeriod={billingPeriod} toggleBillingPeriod={toggleBillingPeriod} yearlyDiscount={getYearlyDiscount()} />
              </div>
              <div className="mt-6">
                <Plan
                  title={title}
                  description={description}
                  badge={badge}
                  prices={prices}
                  features={features}
                  billingPeriod={billingPeriod}
                  currency={currency}
                  price={getPrice()}
                />
              </div>
            </div>
          </div>
        </div> */}
      </Form>

      <ConfirmModal ref={confirmRemove} onYes={yesRemove} />
    </>
  );
}
