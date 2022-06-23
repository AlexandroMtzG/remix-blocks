import { useState } from "react";
import InputText from "~/components/ui/input/InputText";

export default function PreviewInputTextWithTranslation() {
  const [valid, setValid] = useState("shared.hi");
  const [invalid, setInvalid] = useState("shared.invalid.i18n.key");
  return (
    <div id="input-text-with-translations">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <div className="space-y-2">
          <InputText name="name" title="Valid i18n key" value={valid} setValue={setValid} withTranslation />
          <InputText name="name" title="Invalid i18n key" value={invalid} setValue={setInvalid} withTranslation />
        </div>
      </div>
    </div>
  );
}
