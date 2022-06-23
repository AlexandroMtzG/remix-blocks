import PreviewTabsAsButtons from "./PreviewTabsAsButtons";
import PreviewTabsAsLinks from "./PreviewTabsAsLinks";

export default function PreviewTabs() {
  return (
    <div id="tabs" className="space-y-6">
      <div className="space-y-1">
        <h3 className="font-medium text-sm">Tab - as Links</h3>
        <div className="flex items-center space-x-2 p-2 border-dashed border-gray-300 border">
          <PreviewTabsAsLinks />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-sm">Tab - as Buttons</h3>
        <div className="p-2 border-dashed border-gray-300 border">
          <PreviewTabsAsButtons />
        </div>
      </div>
    </div>
  );
}
