import LogoLight from "~/assets/img/logo-light.png";
import LogoDark from "~/assets/img/logo-dark.png";

export default function PreviewLogo() {
  return (
    <div id="logo" className="space-y-3 lg:grid lg:grid-cols-2 lg:space-y-0 w-full">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
          <img className="w-auto mx-auto h-10" src={LogoLight} alt="Logo" />
        </div>
      </div>

      <div className="bg-gray-900 p-6 border-dashed border-gray-500 border">
        <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
          <img className="w-auto mx-auto h-10" src={LogoDark} alt="Logo" />
        </div>
      </div>
    </div>
  );
}
