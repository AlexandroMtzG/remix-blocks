import { useState } from "react";
import Tabs from "./Tabs";

export default function PreviewTabsAsButtons() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="space-y-2 w-full">
      <Tabs
        asLinks={false}
        onSelected={(selected) => {
          setSelectedTab(selected);
        }}
        className="w-full sm:w-auto"
        tabs={[{ name: "Tab 1" }, { name: "Tab 2" }, { name: "Tab 3" }]}
      />
      <div className="p-2 bg-gray-100 border border-gray-300">
        {selectedTab === 0 ? <div>Tab 1 Content...</div> : selectedTab === 1 ? <div>Tab 2 Content...</div> : <div>Tab 3 Content...</div>}
      </div>
    </div>
  );
}
