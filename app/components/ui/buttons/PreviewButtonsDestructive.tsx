import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import ButtonTertiary from "./ButtonTertiary";

export default function PreviewButtonsDestructive() {
  return (
    <div id="buttons-as-links">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <div className="space-y-2 w-full">
          <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
            <ButtonPrimary onClick={() => alert("Clicked primary destructive button")} destructive={true}>
              Primary
            </ButtonPrimary>
            <ButtonSecondary onClick={() => alert("Clicked secondary destructive button")} destructive={true}>
              Secondary
            </ButtonSecondary>
            <ButtonTertiary onClick={() => alert("Clicked tertiary destructive button")} destructive={true}>
              Tertiary
            </ButtonTertiary>
          </div>
          <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
            <ButtonPrimary disabled={true} destructive={true}>
              Primary
            </ButtonPrimary>
            <ButtonSecondary disabled={true} destructive={true}>
              Secondary
            </ButtonSecondary>
            <ButtonTertiary disabled={true} destructive={true}>
              Tertiary
            </ButtonTertiary>
          </div>
        </div>
      </div>
    </div>
  );
}
