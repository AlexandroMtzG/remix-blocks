import { useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import FloatingLoader from "./FloatingLoader";

export default function PreviewFloatingLoader() {
  const [open, setOpen] = useState(false);
  return (
    <div id="floating-loader">
      <div className="bg-white p-6 border-dashed border-gray-300 border not-prose">
        <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
          <ButtonPrimary onClick={() => setOpen(!open)}>{open ? "Hide floating loader" : "Show floating loader"}</ButtonPrimary>
          <FloatingLoader loading={open} />
        </div>
      </div>
    </div>
  );
}
