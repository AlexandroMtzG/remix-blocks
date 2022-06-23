import { useLocation } from "@remix-run/react";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import ButtonTertiary from "./ButtonTertiary";

export default function PreviewButtonsAsLinks() {
  const currentRoute = useLocation().pathname;
  return (
    <div id="buttons-as-links">
      <div className="bg-white p-6 border-dashed border-gray-300 border not-prose">
        <div className="space-y-2 w-full">
          <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
            <ButtonPrimary to={currentRoute}>Primary</ButtonPrimary>
            <ButtonSecondary to={currentRoute}>Secondary</ButtonSecondary>
            <ButtonTertiary to={currentRoute}>Tertiary</ButtonTertiary>
          </div>
          <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
            <ButtonPrimary disabled={true} to={currentRoute}>
              Primary
            </ButtonPrimary>
            <ButtonSecondary disabled={true} to={currentRoute}>
              Secondary
            </ButtonSecondary>
            <ButtonTertiary disabled={true} to={currentRoute}>
              Tertiary
            </ButtonTertiary>
          </div>
        </div>
      </div>
    </div>
  );
}
