import IconLight from "~/assets/img/icon-light.png";
import IconDark from "~/assets/img/icon-dark.png";

export default function PreviewIcon() {
  return (
    <div id="icon" className="space-y-3 lg:grid lg:grid-cols-2 lg:space-y-0 w-full">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
          <img className="w-auto mx-auto h-10" src={IconLight} alt="Icon" />
        </div>
      </div>

      <div className="bg-gray-900 p-6 border-dashed border-gray-500 border">
        <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
          <img className="w-auto mx-auto h-10" src={IconDark} alt="Icon" />
        </div>
      </div>
    </div>
  );
}
