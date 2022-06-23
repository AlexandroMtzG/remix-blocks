import clsx from "clsx";
import { MediaDto } from "~/application/dtos/entities/MediaDto";
import ButtonTertiary from "../buttons/ButtonTertiary";
import DownloadIcon from "../icons/DownloadIcon";
import EyeIcon from "../icons/EyeIcon";
import PaperClipIcon from "../icons/PaperClipIcon";
import TrashIcon from "../icons/TrashIcon";
import InputText from "../input/InputText";

interface Props {
  item: MediaDto;
  onChangeTitle: (e: string) => void;
  onDelete: () => void;
  onDownload?: () => void;
  onPreview?: () => void;
  readOnly?: boolean;
}
export default function MediaItem({ item, onChangeTitle, onDelete, onDownload, onPreview, readOnly }: Props) {
  return (
    <div className="w-full bg-white text-xs border border-dashed border-gray-300 px-2">
      {readOnly ? (
        <div className="pr-4 py-2 flex items-center justify-between text-sm">
          <div className="w-0 flex-1 flex items-center">
            <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="ml-2 flex-1 w-0 truncate">{item.name}</span>
          </div>
          <div className="ml-4 flex-shrink-0 space-x-2">
            <div className="flex items-center space-x-3">
              <ButtonTertiary type="button" onClick={onPreview} className=" border-0 shadow-none font-medium text-gray-500 hover:text-gray-500">
                <EyeIcon className="h-4 w-4 text-gray-600" />
              </ButtonTertiary>
              <ButtonTertiary type="button" onClick={onDownload} className=" border-0 shadow-none font-medium text-gray-500 hover:text-gray-500">
                <DownloadIcon className="h-4 w-4 text-gray-600" />
              </ButtonTertiary>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between space-x-2 items-center select-none py-1">
          <div className="flex flex-grow space-x-1 items-center py-1">
            <div className="inline-flex items-center justify-center h-9 w-9 rounded-sm border border-gray-300 bg-gray-100">
              <span className="p-1 text-xs font-medium text-gray-500 uppercase">
                <div>{item.type.split("/")[1]}</div>
              </span>
            </div>
            <InputText
              withLabel={false}
              title="Media"
              readOnly={readOnly}
              required
              name="media-title"
              maxLength={50}
              value={item.title}
              setValue={(e) => onChangeTitle(e.toString())}
              className="w-full rounded-sm"
            />
            {/* <div className=" text-lg">.{type.split("/")[1]}</div> */}
          </div>
          <div>
            <ButtonTertiary disabled={readOnly} onClick={() => onDelete()} className="hover:bg-gray-50 group p-2">
              <TrashIcon className={clsx("h-4 w-4 text-gray-500", readOnly ? "opacity-80" : "group-hover:text-gray-900")} />
            </ButtonTertiary>
          </div>
        </div>
      )}
    </div>
  );
}
