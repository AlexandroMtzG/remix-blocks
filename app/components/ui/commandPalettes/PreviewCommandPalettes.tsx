import { useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import CommandPalette from "./CommandPalette";

export default function PreviewCommandPalettes() {
  const [open, setOpen] = useState(false);
  return (
    <div id="buttons">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <div id="buttons" className="space-y-2 w-full">
          <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
            <ButtonPrimary onClick={() => setOpen(true)}>Show command palette</ButtonPrimary>
          </div>
          <CommandPalette
            isOpen={open}
            onClosed={() => setOpen(false)}
            commands={[
              {
                command: "1",
                title: "Title 1",
                description: "Description #1",
                onSelected: () => alert("Selected command #1"),
              },
              {
                command: "2",
                title: "Title 2",
                description: "Description 2",
                onSelected: () => alert("Selected command #2"),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
