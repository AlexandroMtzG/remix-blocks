// import { t } from "i18next";
// import { SubscriptionFeatureDto } from "~/application/dtos/subscriptions/SubscriptionFeatureDto";
// import EmptyState from "~/components/ui/emptyState/EmptyState";
// import InputCheckbox from "~/components/ui/input/InputCheckbox";
// import InputText from "~/components/ui/input/InputText";
// import CollapsibleRow from "~/components/ui/tables/CollapsibleRow";
// import { updateItemByIdx } from "~/utils/shared/ObjectUtils";

// interface Props {
//   features: SubscriptionFeatureDto[];
//   setFeatures: React.Dispatch<React.SetStateAction<SubscriptionFeatureDto[]>>;
// }
// export default function PricingFeaturesForm({ features, setFeatures }: Props) {
//   function addFeature() {
//     const maxOrder = Math.max(...features.map((o) => o.order));
//     setFeatures([
//       ...features,
//       {
//         order: maxOrder + 1,
//         key: "Feature " + (features.length + 1),
//         value: "",
//         included: true,
//         subscriptionProductId: "",
//       },
//     ]);
//   }
//   return (
//     <>
//       {features.length === 0 ? (
//         <EmptyState
//           icon="plus"
//           onClick={addFeature}
//           captions={{
//             thereAreNo: "No features",
//             new: "Add a feature",
//           }}
//         />
//       ) : (
//         <>
//           <div className=" divide-y divide-gray-200 border-b border-gray-200">
//             {features.map((item, idx) => {
//               return (
//                 <div key={idx} className=" ">
//                   <input hidden readOnly type="text" id="features[]" name="features[]" value={JSON.stringify(item)} />
//                   <CollapsibleRow
//                     title={`Feature ${idx + 1} details`}
//                     value={
//                       <div className="flex space-x-2">
//                         {item.included ? (
//                           <svg className="w-5 h-5 text-theme-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                             <path
//                               fillRule="evenodd"
//                               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         ) : (
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" stroke="#FFFFF" fill="currentColor">
//                             <path
//                               fillRule="evenodd"
//                               d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         )}
//                         <div>{t(item.key, [item.value])}</div>
//                       </div>
//                     }
//                     onRemove={() => {
//                       setFeatures(features.filter((_x, i) => i !== idx));
//                     }}
//                   >
//                     <div className="grid grid-cols-6 items-center relative py-3 gap-2">
//                       <div className="col-span-6 sm:col-span-4">
//                         <InputText
//                           name="feature-key"
//                           title="Key"
//                           required
//                           value={item.key}
//                           className="text-xs sm:text-xs"
//                           setValue={(value) =>
//                             updateItemByIdx(features, setFeatures, idx, {
//                               key: value,
//                             })
//                           }
//                           withTranslation={true}
//                           translationParams={[item.value]}
//                         />
//                       </div>

//                       <div className="col-span-3 sm:col-span-1">
//                         <InputText
//                           name="feature-value"
//                           title="Value"
//                           value={item.value}
//                           className="text-xs sm:text-xs"
//                           setValue={(value) =>
//                             updateItemByIdx(features, setFeatures, idx, {
//                               value,
//                             })
//                           }
//                           withTranslation={true}
//                           translationParams={[item.value]}
//                         />
//                       </div>

//                       <div className="col-span-3 sm:col-span-1">
//                         <InputCheckbox
//                           name="feature-included"
//                           title="Included"
//                           value={item.included}
//                           setValue={(value) =>
//                             updateItemByIdx(features, setFeatures, idx, {
//                               included: value,
//                             })
//                           }
//                         />
//                         {/* <InputSelect
//                           name="included"
//                           title={t("pricing.included")}
//                           value={item.included ? 1 : 0}
//                           options={[
//                             {
//                               name: t("pricing.notIncluded"),
//                               value: 0,
//                             },
//                             {
//                               name: t("pricing.included"),
//                               value: 1,
//                             },
//                           ]}
//                           onChange={(e) => {
//                             updateItemByIdx(features, setFeatures, idx, {
//                               included: Number(e.target.value),
//                             });
//                           }}
//                           className="text-xs sm:text-xs"
//                         /> */}
//                       </div>
//                     </div>
//                   </CollapsibleRow>
//                 </div>
//               );
//             })}
//           </div>
//           <button
//             type="button"
//             onClick={addFeature}
//             className="mt-2 flex items-center space-x-1 text-xs text-gray-600 border border-gray-300 bg-white rounded-md px-2 py-1 hover:bg-gray-100 focus:text-gray-800 focus:ring focus:ring-offset-1 focus:ring-gray-300"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             <span className="uppercase font-medium">{t("shared.add")}</span>
//           </button>
//         </>
//       )}
//     </>
//   );
// }
