import PreviewDropdownsSimple from "./PreviewDropdownsSimple";
import PreviewDropdownsWithClick from "./PreviewDropdownsWithClick";

export default function PreviewDropdowns() {
  return (
    <div id="dropdowns">
      <div className="space-y-1">
        <h3 className="font-medium text-sm">Dropdowns - Simple</h3>
        <div className="space-x-2 bg-white p-6 border-dashed border-gray-300 border">
          <PreviewDropdownsSimple />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-sm">Dropdowns</h3>
        <div className="space-x-2 bg-white p-6 border-dashed border-gray-300 border">
          <PreviewDropdownsWithClick />
        </div>
      </div>
    </div>
  );
}
