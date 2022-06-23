import clsx from "~/utils/shared/ClassesUtils";

interface Props {
  name: string;
  title: string;
  withLabel?: boolean;
  options: { name: string; value: string | number | undefined; disabled?: boolean }[];
  value?: string | number | undefined;
  setValue?: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}
export default function InputSelect({ name, title, withLabel = true, value, options, setValue, className, required, disabled }: Props) {
  return (
    <div className={clsx(className, "flex-grow w-full text-gray-800")}>
      {withLabel && (
        <label htmlFor={name} className="block text-xs font-medium text-gray-700 truncate">
          <div>
            {title}
            {required && <span className="ml-1 text-red-500">*</span>}
          </div>
        </label>
      )}
      <div className={clsx(withLabel && "mt-1")}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => (setValue ? setValue(e.currentTarget.value) : {})}
          className={clsx(
            "w-full flex-1 focus:ring-accent-500 focus:border-accent-500 block min-w-0 rounded-md sm:text-sm border-gray-300",
            className,
            disabled && "bg-gray-100 cursor-not-allowed"
          )}
          disabled={disabled}
        >
          {options.map((item, idx) => {
            return (
              <option key={idx} value={item.value} disabled={item.disabled}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
