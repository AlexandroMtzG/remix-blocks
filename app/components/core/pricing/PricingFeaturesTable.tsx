import { t } from "i18next";
import { SubscriptionFeatureDto } from "~/application/dtos/subscriptions/SubscriptionFeatureDto";
import { InputType } from "~/application/enums/shared/InputType";
import { SubscriptionFeatureLimitType } from "~/application/enums/subscriptions/SubscriptionFeatureLimitType";
import TableSimple from "~/components/ui/tables/TableSimple";
import { updateItemByIdx } from "~/utils/shared/ObjectUtils";

interface Props {
  items: SubscriptionFeatureDto[];
  setItems: React.Dispatch<React.SetStateAction<SubscriptionFeatureDto[]>>;
}
export default function PricingFeaturesTable({ items, setItems }: Props) {
  function addFeature() {
    const order = items.length === 0 ? 1 : Math.max(...items.map((o) => o.order)) + 1;
    setItems([
      ...items,
      {
        order,
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
      <div className="">
        <TableSimple
          headers={[
            {
              title: "Title (can be a i18n key)",
              name: "feature-title",
              className: "w-40",
              value: (item) => item.title,
              setValue: (title, idx) =>
                updateItemByIdx(items, setItems, idx, {
                  title,
                }),
            },
            {
              title: "Type",
              name: "feature-type",
              type: InputType.SELECT,
              value: (item) => item.type,
              className: "w-32",
              options: [
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
              ],
              setValue: (type, idx) => {
                let value = items[idx].value;
                if (Number(type) !== SubscriptionFeatureLimitType.MAX && Number(type) !== SubscriptionFeatureLimitType.MONTHLY) {
                  value = 0;
                }
                updateItemByIdx(items, setItems, idx, {
                  type,
                  value,
                });
              },
            },
            {
              title: "Name (internal ID)",
              name: "feature-name",
              className: "w-32",
              value: (item) => item.name,
              setValue: (name, idx) =>
                updateItemByIdx(items, setItems, idx, {
                  name,
                }),
            },
            {
              title: "Value",
              name: "feature-value",
              type: InputType.NUMBER,
              className: "w-32",
              value: (item) => item.value,
              editable: (item) => item.type === SubscriptionFeatureLimitType.MAX || item.type === SubscriptionFeatureLimitType.MONTHLY,
              setValue: (value, idx) =>
                updateItemByIdx(items, setItems, idx, {
                  value,
                }),
            },
          ]}
          items={items}
          actions={[
            {
              title: t("shared.delete"),
              onClick: (idx) => setItems(items.filter((_x, i) => i !== idx)),
            },
          ]}
        ></TableSimple>
        {items.map((item, idx) => {
          return (
            <div key={item.name} className=" ">
              <input hidden readOnly type="text" id="features[]" name="features[]" value={JSON.stringify(item)} />
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
