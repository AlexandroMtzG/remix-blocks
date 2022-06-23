import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import ButtonTertiary from "./ButtonTertiary";
import LoadingButton, { RefLoadingButton } from "./LoadingButton";
import { useRef } from "react";

export default function PreviewButtons() {
  const loadingButton = useRef<RefLoadingButton>(null);
  function startLoading() {
    if (loadingButton.current) {
      loadingButton.current?.start();
      setTimeout(() => {
        loadingButton.current?.stop();
      }, 2000);
    }
  }
  return (
    <div id="buttons">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <div id="buttons" className="space-y-2 w-full">
          <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
            <ButtonPrimary onClick={() => alert("Clicked primary button")}>Primary</ButtonPrimary>
            <ButtonSecondary onClick={() => alert("Clicked secondary button")}>Secondary</ButtonSecondary>
            <ButtonTertiary onClick={() => alert("Clicked tertiary button")}>Tertiary</ButtonTertiary>
            <LoadingButton ref={loadingButton} onClick={() => startLoading()}>
              Loading
            </LoadingButton>
          </div>
          <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
            <ButtonPrimary disabled={true}>Primary</ButtonPrimary>
            <ButtonSecondary disabled={true}>Secondary</ButtonSecondary>
            <ButtonTertiary disabled={true}>Tertiary</ButtonTertiary>
            <LoadingButton disabled={true}>Loading</LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
