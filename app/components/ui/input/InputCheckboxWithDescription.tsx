import clsx from "clsx";
import { ReactNode } from "react";
import HintTooltip from "../tooltips/HintTooltip";

interface Props {
  name: string;
  title: string | ReactNode;
  description: string | ReactNode;
  value?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  help?: string;
  disabled?: boolean;
}
export default function InputCheckboxWithDescription({ name, title, value, setValue, description, className, help, disabled = false }: Props) {
  return (
    <div className={clsx("relative flex items-start pt-2 pb-4", className)}>
      <div className="min-w-0 flex-1 text-sm">
        <label htmlFor={name} className="select-none cursor-pointer">
          <div className="font-medium text-gray-700">{title}</div>

          {help && <HintTooltip text={help} />}

          <div id={name + "-description"} className="text-gray-400">
            {description}
          </div>
        </label>
      </div>
      <div className="ml-3 flex items-center h-5">
        <input
          id={name}
          aria-describedby={name + "-description"}
          name={name}
          type="checkbox"
          checked={value}
          onChange={(e) => {
            setValue?.(e.target.checked);
          }}
          disabled={disabled}
          className={clsx(disabled && "bg-gray-100 cursor-not-allowed", "cursor-pointer focus:ring-accent-500 h-4 w-4 text-accent-600 border-gray-300 rounded")}
        />
      </div>
    </div>
  );
}
