import { useState } from "react";
import InputDate from "~/components/ui/input/InputDate";

export default function PreviewInputDateWithState() {
  const [value, setValue] = useState(new Date("1990-01-02"));
  return (
    <div id="input-date-with-state">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <InputDate name="name" title="Title" value={value} onChange={(e) => setValue(e)} />
      </div>
    </div>
  );
}
