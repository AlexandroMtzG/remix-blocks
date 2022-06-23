import ButtonSecondary from "./buttons/ButtonSecondary";
import SlideOver from "./slideOvers/SlideOver";
import { useState } from "react";
import clsx from "clsx";
import PreviewBreadcrumbs from "./breadcrumbs/PreviewBreadcrumbs";
import PreviewButtons from "./buttons/PreviewButtons";
import PreviewButtonsAsLinks from "./buttons/PreviewButtonsAsLinks";
import PreviewButtonsDestructive from "./buttons/PreviewButtonsDestructive";
import PreviewModals from "./modals/PreviewModals";
import PreviewBanners from "./banners/PreviewBanners";
import PreviewEmptyStates from "./emptyState/PreviewEmptyStates";
import PreviewUploadersDocument from "./uploaders/PreviewUploadersDocument";
import PreviewPdfViewers from "./pdf/PreviewPdfViewers";
import PreviewLoaders from "./loaders/PreviewLoaders";
import PreviewInputs from "./input/PreviewInputs";
// import PreviewDatepickers from "./datepickers/PreviewDatepickers";
import PreviewDropdowns from "./dropdowns/PreviewDropdowns";
import PreviewTabs from "./tabs/PreviewTabs";

interface Props {
  className?: string;
  withSlideOvers?: boolean;
}

export default function AllComponentsList({ className, withSlideOvers }: Props) {
  const [showRightSlideOver, setShowRightSlideOver] = useState(false);
  return (
    <div>
      <div className={clsx(className, "space-y-6 text-slate-900")}>
        {/* <div className="space-y-1">
          <h3 className="font-medium text-sm">Breadcrumbs</h3>
          <div className="flex items-center space-x-2 p-2 border-dashed border-gray-300 border">
            <PreviewDatepickers />
          </div>
        </div> */}

        <PreviewInputs />

        <PreviewBreadcrumbs />

        <PreviewTabs />

        <PreviewButtons />

        <div className="space-y-1">
          <h3 className="font-medium text-sm">Buttons - as Links</h3>
          <div className="bg-white p-6 border-dashed border-gray-300 border">
            <PreviewButtonsAsLinks />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-sm">Buttons - Destructive</h3>
          <div className="bg-white p-6 border-dashed border-gray-300 border">
            <PreviewButtonsDestructive />
          </div>
        </div>

        <PreviewDropdowns />

        <div className="space-y-1">
          <h3 className="font-medium text-sm">Modals</h3>
          <div className="bg-white p-6 border-dashed border-gray-300 border">
            <PreviewModals />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-sm">Banners</h3>
          <div className="bg-white p-6 border-dashed border-gray-300 border">
            <PreviewBanners />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-sm">Empty States</h3>
          <div className="bg-white p-6 border-dashed border-gray-300 border">
            <PreviewEmptyStates />
          </div>
        </div>

        <PreviewUploadersDocument />

        <div className="space-y-1">
          <h3 className="font-medium text-sm">Pdf Viewer</h3>
          <div className="bg-white p-6 border-dashed border-gray-300 border">
            <PreviewPdfViewers />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-sm">Loaders</h3>
          <div className="bg-white p-6 border-dashed border-gray-300 border">
            <PreviewLoaders />
          </div>
        </div>

        {withSlideOvers && (
          <div className="space-y-1">
            <h3 className="font-medium text-sm">Slide-overs</h3>
            <div className="bg-white p-6 border-dashed border-gray-300 border">
              <ButtonSecondary onClick={() => setShowRightSlideOver(!showRightSlideOver)}>Right slide-over</ButtonSecondary>
            </div>
          </div>
        )}

        {/*SlideOver */}
        {showRightSlideOver && <SlideOver onClose={() => setShowRightSlideOver(false)}>Your content here...</SlideOver>}
      </div>
    </div>
  );
}
