import { Entity } from "@prisma/client";
import { t } from "i18next";
import { SubscriptionFeatureDto } from "~/application/dtos/subscriptions/SubscriptionFeatureDto";
import { SubscriptionFeatureLimitType } from "~/application/enums/subscriptions/SubscriptionFeatureLimitType";
import InputNumber from "~/components/ui/input/InputNumber";
import InputSelect from "~/components/ui/input/InputSelect";
import InputText from "~/components/ui/input/InputText";
import CollapsibleRow from "~/components/ui/tables/CollapsibleRow";
import { updateItemByIdx } from "~/utils/shared/ObjectUtils";

interface Props {
  items: SubscriptionFeatureDto[];
  setItems: React.Dispatch<React.SetStateAction<SubscriptionFeatureDto[]>>;
  entities: Entity[];
}
export default function PricingFeaturesForm({ items, setItems, entities }: Props) {
  function addFeature() {
    const maxOrder = Math.max(...items.map((o) => o.order));
    setItems([
      ...items,
      {
        order: maxOrder + 1,
        title: "",
        name: "",
        type: SubscriptionFeatureLimitType.NOT_INCLUDED,
        value: 0,
      },
    ]);
  }

  // useEffect(() => {
  //   for (let idx = 0; idx < items.length; idx++) {
  //     const item = items[idx];
  //     if (item.type !== SubscriptionFeatureLimitType.MAX && item.type !== SubscriptionFeatureLimitType.MONTHLY) {
  //       updateItemByIdx(items, setItems, idx, {
  //         value: 0,
  //       });
  //     }
  //   }
  // }, [items]);

  return (
    <>
      <div className=" divide-y divide-gray-200 border-b border-gray-200">
        {items.map((item, idx) => {
          return (
            <div key={item.name} className=" ">
              <input hidden readOnly type="text" id="features[]" name="features[]" value={JSON.stringify(item)} />
              <CollapsibleRow
                title={`Feature ${idx + 1} details`}
                value={
                  <div className="flex space-x-1">
                    {item.title ? (
                      <>
                        <div className="flex space-x-2">
                          {item.type !== SubscriptionFeatureLimitType.NOT_INCLUDED ? (
                            <svg
                              className="w-5 h-5 text-theme-500"
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" stroke="#FFFFF" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>

                        {/* {item.type === SubscriptionFeatureLimitType.INCLUDED && <span>Included</span>}
                        {item.type === SubscriptionFeatureLimitType.NOT_INCLUDED && <span>Included</span>} */}
                        {item.type === SubscriptionFeatureLimitType.MONTHLY && <span>Monthly</span>}
                        {item.type === SubscriptionFeatureLimitType.MAX && <span>Max</span>}
                        {item.type === SubscriptionFeatureLimitType.UNLIMITED && <span>Unlimited</span>}
                        <div>{t(item.title)}</div>
                        {(item.type === SubscriptionFeatureLimitType.MONTHLY || item.type === SubscriptionFeatureLimitType.MAX) && <div>{item.value}</div>}
                      </>
                    ) : (
                      <>{t("shared.undefined")}</>
                    )}
                  </div>
                }
                onRemove={() => {
                  setItems(items.filter((_x, i) => i !== idx));
                }}
              >
                <div className="grid grid-cols-12 items-center relative py-3 gap-2">
                  <div className="col-span-6">
                    <InputText
                      name="feature-title"
                      title="Title"
                      required
                      value={item.title}
                      className="text-xs sm:text-xs"
                      setValue={(title) =>
                        updateItemByIdx(items, setItems, idx, {
                          title,
                        })
                      }
                      withTranslation={true}
                      translationParams={[item.value.toString()]}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputText
                      name="feature-name"
                      title="Name"
                      required
                      value={item.name}
                      className="text-xs sm:text-xs"
                      setValue={(name) =>
                        updateItemByIdx(items, setItems, idx, {
                          name,
                        })
                      }
                      help={"Internal ID"}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputSelect
                      className="text-xs sm:text-xs"
                      name="feature-type"
                      title="Type"
                      value={item.type}
                      setValue={(type) =>
                        updateItemByIdx(items, setItems, idx, {
                          type,
                        })
                      }
                      options={[
                        {
                          name: "Not included",
                          value: SubscriptionFeatureLimitType.NOT_INCLUDED,
                        },
                        {
                          name: "Included",
                          value: SubscriptionFeatureLimitType.INCLUDED,
                        },
                        {
                          name: "Monthly",
                          value: SubscriptionFeatureLimitType.MONTHLY,
                        },
                        {
                          name: "Max",
                          value: SubscriptionFeatureLimitType.MAX,
                        },
                        {
                          name: "Unlimited",
                          value: SubscriptionFeatureLimitType.UNLIMITED,
                        },
                      ]}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputNumber
                      name="feature-value"
                      title="Value"
                      value={item.value}
                      className="text-xs sm:text-xs"
                      setValue={(value) =>
                        updateItemByIdx(items, setItems, idx, {
                          value,
                        })
                      }
                    />
                  </div>
                </div>
              </CollapsibleRow>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={addFeature}
        className="mt-2 flex items-center space-x-1 text-xs text-gray-600 border border-gray-300 bg-white rounded-md px-2 py-1 hover:bg-gray-100 focus:text-gray-800 focus:ring focus:ring-offset-1 focus:ring-gray-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="uppercase font-medium">{t("shared.add")}</span>
      </button>
    </>
  );
}
