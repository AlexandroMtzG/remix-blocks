import { useState } from "react";
import InputCheckbox from "~/components/ui/input/InputCheckbox";

export default function PreviewInputCheckboxWithState() {
  const [value, setValue] = useState(true);
  return (
    <div id="input-checkbox-with-state">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <InputCheckbox name="name" title="Title" value={value} setValue={setValue} />
      </div>
    </div>
  );
}
