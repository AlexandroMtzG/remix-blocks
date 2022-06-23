import Loading from "./Loading";

export default function PreviewLoaders() {
  return (
    <div id="loaders">
      <div className="bg-white p-6 border-dashed border-gray-300 border not-prose">
        <div id="buttons" className="space-y-2 w-full">
          <Loading loading={true} />
        </div>
      </div>
    </div>
  );
}
