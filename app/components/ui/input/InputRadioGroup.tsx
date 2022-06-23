import { RadioGroup } from "@headlessui/react";
import { ReactNode } from "react";
import clsx from "~/utils/shared/ClassesUtils";

interface Props {
  name: string;
  title: string;
  options: { name: string | ReactNode; value: string | number | undefined; disabled?: boolean }[];
  value?: string | number | undefined;
  setValue?: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}
export default function InputRadioGroup({ name, title, value, options, setValue, className, required, disabled }: Props) {
  return (
    <div className={clsx(className, "flex-grow w-full")}>
      <div className="flex items-center justify-between">
        <label className="flex justify-between space-x-2 text-xs font-medium text-gray-600 truncate">
          {title}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>

      <input type="hidden" name={name} value={value} />

      <RadioGroup disabled={disabled} defaultValue={value} value={value} onChange={(e) => (setValue ? setValue(e) : {})} className={clsx(title && "mt-1")}>
        <RadioGroup.Label className="sr-only">{title}</RadioGroup.Label>
        <div className={clsx("flex space-x-2")}>
          {options.map((option, idx) => (
            <RadioGroup.Option
              key={idx}
              value={option.value}
              className={({ active, checked }) =>
                clsx(
                  !option.disabled && !disabled ? "cursor-pointer focus:outline-none " : "opacity-25 cursor-not-allowed",
                  active ? "ring-2 focus:ring-accent-300 ring-accent-500" : "",
                  checked
                    ? "hover:text-accent-100 bg-theme-800 border-transparent text-white hover:bg-theme-900"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md py-1.5 px-2 flex items-center justify-center font-medium sm:flex-1"
                )
              }
              disabled={option.disabled}
            >
              <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
