import Tabs from "./Tabs";

export default function PreviewTabsAsLinks() {
  return (
    <div className="space-y-2 w-full not-prose">
      <Tabs
        asLinks={true}
        className="w-full sm:w-auto"
        tabs={[
          { name: "Home", routePath: "/components" },
          {
            name: "Components",
            routePath: "/components/tabs",
          },
        ]}
      />
    </div>
  );
}
