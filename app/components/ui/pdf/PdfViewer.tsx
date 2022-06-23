import { useEffect, useState, useRef, useCallback } from "react";
import * as PDFJS from "pdfjs-dist";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface Props {
  file: any;
  className?: string;
  fileName?: any;
  editing?: boolean;
  canDownload?: boolean;
  onRemoveFile?: () => void;
}

export default function PdfViewer({ className, file, onRemoveFile, fileName = "", editing = false, canDownload = true }: Props) {
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  PDFJS.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js";

  const [pdfRef, setPdfRef] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  function downloadPdf() {
    const downloadLink = document.createElement("a");
    const name = (fileName ?? "document") + ".pdf";
    downloadLink.href = file;
    downloadLink.download = name;
    downloadLink.click();
  }

  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      if (pdf) {
        setPageCount(pdf.numPages);
        pdf.getPage(pageNum).then(function (page: any) {
          const viewport = page.getViewport({ scale: 0.49 });
          const canvas = canvasRef.current;
          if (canvas) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
              canvasContext: canvas.getContext("2d"),
              viewport: viewport,
            };
            page.render(renderContext);
          }
        });
      }
    },
    [pdfRef]
  );

  useEffect(() => {
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = PDFJS.getDocument(file);
    loadingTask.promise.then(
      (loadedPdf) => {
        setPdfRef(loadedPdf);
      }
      // function (reason) {
      //   console.error(reason);
      // }
    );
  }, [file]);

  const nextPage = () => {
    pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
  };

  return (
    <div id="pdf-viewer" className={clsx(className, "text-gray-600 overflow-hidden border border-gray-300 rounded-md items-center")}>
      <div className="p-4 flex justify-between items-center">
        <div className="origin-top-left left-0 top-0 mt-1 ml-1 flex items-center space-x-2">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              className={clsx(
                "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-theme-500 focus:border-theme-500",
                currentPage === 1 && "cursor-not-allowed  bg-gray-50",
                currentPage !== 1 && "hover:bg-gray-50"
              )}
              disabled={currentPage === 1}
              onClick={prevPage}
            >
              <span className="sr-only">{t("shared.previous")}</span>
              {/*Heroicon name: solid/chevron-left */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 select-none">
              {currentPage} / {pageCount}
            </span>
            <button
              type="button"
              className={clsx(
                "-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-theme-500 focus:border-theme-500",
                currentPage === pageCount && "cursor-not-allowed bg-gray-50",
                currentPage !== pageCount && "hover:bg-gray-50"
              )}
              disabled={currentPage === pageCount}
              onClick={nextPage}
            >
              <span className="sr-only">{t("shared.next")}</span>
              {/*Heroicon name: solid/chevron-right */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {canDownload && (
            <button
              type="button"
              className="origin-top-right right-0 top-0 mt-1 mr-0 text-gray-600 hover:bg-gray-50 inline-flex items-center px-1.5 py-1.5 border-gray-300 text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-theme-500"
              onClick={downloadPdf}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
          {editing && (
            <button
              type="button"
              className="origin-top-right right-0 top-0 mt-1 mr-0 text-gray-600 hover:bg-gray-50 inline-flex items-center px-1.5 py-1.5 border-gray-300 text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-theme-500"
              onClick={onRemoveFile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="py-4 mx-auto text-center flex items-center justify-center">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
