import clsx from "clsx";
import { forwardRef, ReactNode, Ref, RefObject, useImperativeHandle, useRef } from "react";
import HintTooltip from "~/components/ui/tooltips/HintTooltip";

export interface RefInputCheckbox {
  input: RefObject<HTMLInputElement>;
}

interface Props {
  name: string;
  title: string;
  value?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  help?: string;
  required?: boolean;
  disabled?: boolean;
  description?: ReactNode;
  readOnly?: boolean;
}
const InputCheckboxInline = (
  { name, title, value, setValue, description, className, help, required, disabled = false, readOnly }: Props,
  ref: Ref<RefInputCheckbox>
) => {
  useImperativeHandle(ref, () => ({ input }));
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className={className}>
      <div className="sm:col-span-6 relative flex items-start select-none cursor-pointer">
        <div className="flex items-center h-5 cursor-pointer">
          <input
            type="checkbox"
            id={name}
            name={name}
            defaultChecked={value}
            onChange={(e) => {
              setValue?.(e.target.checked);
            }}
            disabled={disabled}
            readOnly={readOnly}
            className={clsx(
              (disabled || readOnly) && "bg-gray-100 cursor-not-allowed",
              "cursor-pointer focus:ring-accent-500 h-4 w-4 text-accent-600 border-gray-300 rounded"
            )}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={name} className="font-medium text-gray-700 cursor-pointer">
            <div className=" flex space-x-1 items-center">
              <div>
                {title}
                {description}
                {required && <span className="ml-1 text-red-500">*</span>}
              </div>

              {help && <HintTooltip text={help} />}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
export default forwardRef(InputCheckboxInline);
