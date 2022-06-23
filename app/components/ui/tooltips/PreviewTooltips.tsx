import HintTooltip from "./HintTooltip";

export default function PreviewTooltips() {
  return (
    <div id="tabs" className="space-y-6">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <label className="flex items-start space-x-1">
          <span>Text</span> <HintTooltip text="Help text" />
        </label>
      </div>
    </div>
  );
}
