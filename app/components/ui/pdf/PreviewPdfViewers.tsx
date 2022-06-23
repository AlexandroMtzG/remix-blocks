import PdfViewer from "./PdfViewer";
import FakePdfBase64 from "./FakePdfBase64";

export default function PreviewPdfViewers() {
  return (
    <div className="space-y-2 w-full">
      <PdfViewer file={FakePdfBase64} />
    </div>
  );
}
