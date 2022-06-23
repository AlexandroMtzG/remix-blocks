import clsx from "clsx";
import { forwardRef, ReactNode, Ref, RefObject, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import HintTooltip from "~/components/ui/tooltips/HintTooltip";

export interface RefInputText {
  input: RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement>;
}

interface Props {
  name: string;
  title: string;
  withLabel?: boolean;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  help?: string;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  withTranslation?: boolean;
  translationParams?: string[];
  placeholder?: string;
  pattern?: string;
  hint?: ReactNode;
  rows?: number;
  button?: ReactNode;
  lowercase?: boolean;
  uppercase?: boolean;
  type?: string;
  darkMode?: boolean;
}
const InputText = (
  {
    name,
    title,
    withLabel = true,
    value,
    setValue,
    className,
    help,
    disabled = false,
    readOnly = false,
    required = false,
    minLength,
    maxLength,
    autoComplete,
    withTranslation = false,
    translationParams = [],
    placeholder,
    pattern,
    hint,
    rows,
    button,
    lowercase,
    uppercase,
    type = "text",
    darkMode,
  }: Props,
  ref: Ref<RefInputText>
) => {
  const { t, i18n } = useTranslation();

  useImperativeHandle(ref, () => ({ input }));
  const input = useRef<HTMLInputElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  function getTranslation(value: string) {
    if (!i18n.exists(value)) {
      return null;
    }
    return t(value);
  }

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (setValue) {
      if (lowercase) {
        setValue(e.currentTarget.value.toLowerCase());
      } else if (uppercase) {
        setValue(e.currentTarget.value.toUpperCase());
      } else {
        setValue(e.currentTarget.value);
      }
    }
  }

  return (
    <div className={clsx(className, !darkMode && "text-gray-800")}>
      {withLabel && (
        <label htmlFor={name} className="flex justify-between space-x-2 text-xs font-medium text-gray-600 truncate">
          <div className=" flex space-x-1 items-center">
            <div>
              {title}
              {required && <span className="ml-1 text-red-500">*</span>}
            </div>

            <span className=" overflow-hidden">{help && <HintTooltip text={help} />}</span>
          </div>
          {withTranslation && value?.includes(".") && (
            <div className="text-slate-600 font-light italic">
              {t("admin.pricing.i18n")}:{" "}
              {getTranslation(value) ? (
                <span className="text-slate-600">{t(value, translationParams ?? [])}</span>
              ) : (
                <span className="text-red-600">{t("shared.invalid")}</span>
              )}
            </div>
          )}
          {hint}
        </label>
      )}
      <div className={clsx("flex rounded-md shadow-sm w-full relative", withLabel && "mt-1")}>
        {!rows ? (
          <>
            <input
              ref={input}
              type={type}
              id={name}
              name={name}
              autoComplete={autoComplete}
              required={required}
              minLength={minLength}
              maxLength={maxLength}
              defaultValue={value ?? ""}
              onChange={onChange}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              pattern={pattern}
              className={clsx(
                "w-full flex-1 focus:ring-accent-500 focus:border-accent-500 block min-w-0 rounded-md sm:text-sm border-gray-300",
                className,
                (disabled || readOnly) && "bg-gray-100 cursor-not-allowed",
                lowercase && "lowercase"
              )}
            />
            {button}
          </>
        ) : (
          <textarea
            rows={rows}
            ref={textArea}
            id={name}
            name={name}
            autoComplete={autoComplete}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            className={clsx(
              "w-full flex-1 focus:ring-accent-500 focus:border-accent-500 block min-w-0 rounded-md sm:text-sm border-gray-300",
              className,
              (disabled || readOnly) && "bg-gray-100 cursor-not-allowed",
              lowercase && "lowercase"
            )}
          />
        )}
      </div>
    </div>
  );
};
export default forwardRef(InputText);
