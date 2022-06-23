import { forwardRef } from "react";
import { format } from "date-fns";

interface Props {
  value?: any;
  onClick?: () => void;
}
const DateInputButton = ({ value, onClick }: Props, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    className="inline-flex justify-start w-full px-3 py-2 text-sm font-normal bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-theme-500"
  >
    {format(new Date(value), "dd MMMM yyyy")}
  </button>
);

export default forwardRef(DateInputButton);
