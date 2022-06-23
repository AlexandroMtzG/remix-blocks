import moment from "moment";
import { useTranslation } from "react-i18next";
import Stripe from "stripe";

interface Props {
  items: Stripe.Invoice[];
}

export default function MyInvoices({ items }: Props) {
  const { t } = useTranslation();
  const getDate = (item: Stripe.Invoice) => {
    const timestampObj = moment.unix(item.created);
    return timestampObj.format("YYYY/MM/DD");
  };
  return (
    <div>
      {items.map((item, idx) => {
        return (
          <div key={idx} className="flex space-x-2 text-gray-800">
            <div className="text-gray-500">{getDate(item)}</div>
            <div className=" text-gray-300">|</div>
            <div className="">{item.lines.data[0].description}</div>
            <div className=" text-gray-300">|</div>
            <a href={item.invoice_pdf ?? ""} rel="noreferrer" target="_blank" className=" underline text-theme-500 ">
              {t("shared.download")}
            </a>
          </div>
        );
      })}
    </div>
  );
}
