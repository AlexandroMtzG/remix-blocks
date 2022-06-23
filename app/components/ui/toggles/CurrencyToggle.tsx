// import clsx from "clsx";
// import { SubscriptionProductDto } from "~/application/dtos/core/subscriptions/SubscriptionProductDto";

// interface Props {
//   className?: string;
//   onSelected?: () => void;
// }

// export default function CurrencyToggle({ className, onSelected }: Props) {
//   function changeCurrency(currency) {
//     store.dispatch(setCurrency(currency));
//     if (onSelected) {
//       onSelected();
//     }
//   }
//   const products = useSelector((state: RootState): SubscriptionProductDto[] => {
//     return state.pricing.products as SubscriptionProductDto[];
//   });
//   const selectedCurrency = useSelector((state: RootState) => {
//     return state.pricing.currency;
//   });
//   const currencies = useSelector(() => {
//     const allCurrencies: string[] = [];
//     function onlyUnique(value, index, self) {
//       return self.indexOf(value) === index;
//     }

//     products.forEach((element) => {
//       element.prices.forEach((price) => {
//         allCurrencies.push(price.currency.toLowerCase());
//       });
//     });
//     return allCurrencies.filter(onlyUnique);
//   });
//   return (
//     <div className={className}>
//       {(currencies && currencies.length > 1) ?? (
//         <div className="w-full flex justify-center mb-0">
//           <div className="flex justify-center items-center rounded-md">
//             {currencies.map((currency, idx) => {
//               <button
//                 type="button"
//                 v-for="(currency, idx) in currencies"
//                 key={idx}
//                 onClick={() => changeCurrency(currency)}
//                 className={clsx(
//                   "border border-slate-200 dark:border-gray-700 uppercase flex justify-center w-36 sm:w-32",
//                   selectedCurrency !== currency
//                     ? "text-xs p-2 cursor-pointer bg-gray-50 dark:bg-gray-700 "
//                     : "text-xs p-2 cursor-pointer bg-white dark:bg-gray-900 border shadow-md border-slate-300 dark:border-gray-600",
//                   idx === 0 ? "rounded-l-md border-r-none" : "rounded-r-md border-l-none"
//                 )}
//               >
//                 {currency}
//               </button>;
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
