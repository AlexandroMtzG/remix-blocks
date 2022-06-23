import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import InputRadioGroup from "../ui/input/InputRadioGroup";

export default function BlockDemoCodeToggle() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const current = tabs.find((element) => element.value && (location.pathname + location.search).includes(element.value));
    if (current) {
      setValue(current.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    navigate(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <InputRadioGroup name="" title="" className="text-xs" value={value} setValue={(e) => setValue(e?.toString() ?? "")} options={tabs} />;
}

const tabs: { name: string | ReactNode; value: string }[] = [
  {
    name: (
      <div className="flex space-x-1 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
        <div className="hidden sm:block">Demo</div>
      </div>
    ),
    value: "",
  },
  {
    name: (
      <div className="flex space-x-1 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <div className="hidden sm:block">Code</div>
      </div>
    ),
    value: "code",
  },
];
