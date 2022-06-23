import InfoBanner from "./InfoBanner";
import WarningBanner from "./WarningBanner";

export default function PreviewBanners() {
  return (
    <div id="banners" className="space-y-2 w-full not-prose text-gray-900">
      <h3 className="font-medium text-sm">InfoBanner</h3>
      <InfoBanner title="Info" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut..." />

      <h3 className="font-medium text-sm">Warning</h3>
      <WarningBanner title="Warning" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut..." />

      <h3 className="font-medium text-sm">Warning with Link</h3>
      <WarningBanner
        title="WarningBanner with Redirect"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut..."
        redirect="https://saasrock.com"
      />
    </div>
  );
}
