import { forwardRef, Fragment, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export interface RefConfirmModal {
  setValue: (value: any) => void;
  show: (_question: string, _yesTitle?: string, _noTitle?: string, _description?: string, _inputString?: string) => void;
}

interface Props {
  destructive?: boolean;
  inputType?: string;
  onYes?: (value: any) => void;
  onNo?: () => void;
}

const ConfirmModal = (props: Props, ref: Ref<RefConfirmModal>) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>();
  const [value, setValue] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [inputString, setInputString] = useState<string | undefined>("");
  const [yesTitle, setYesTitle] = useState<string>("");
  const [noTitle, setNoTitle] = useState<string>("");

  const cancelButtonRef = useRef(null);
  const inputValue = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    setTitle(t("shared.confirm").toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function no() {
    setOpen(false);
    if (props.onNo) {
      props.onNo();
    }
  }

  function yes() {
    setOpen(false);
    if (props.onYes) {
      props.onYes(value);
    }
  }

  useImperativeHandle(ref, () => ({ show, setValue }));

  function show(
    _question: string,
    _yesTitle: string = t("shared.confirm").toString(),
    _noTitle: string = t("shared.back").toString(),
    _description?: string,
    _inputString?: string
  ) {
    setTitle(_question.toString());
    if (_yesTitle) {
      setYesTitle(_yesTitle);
    }
    if (_noTitle) {
      setNoTitle(_noTitle);
    }
    if (_description) {
      setDescription(_description);
    }
    setTimeout(() => {
      if (props.inputType === "email" && inputValue.current) {
        inputValue.current.focus();
        inputValue.current.select();
      }
    }, 0);
    if (_inputString) {
      setInputString(_inputString);
    }
    setOpen(true);
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 w-full">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-50 border border-yellow-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  {props.inputType === "email" && (
                    <div className="mt-4">
                      <label htmlFor="value" className="block text-sm font-medium text-gray-700"></label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/*Heroicon name: solid/mail */}
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <input
                          value={inputString}
                          onChange={(e) => setInputString(e.target.value)}
                          ref={inputValue}
                          type="value"
                          name="email"
                          id="email"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className={clsx(
                    "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm",
                    !props.destructive ? "focus:ring-accent-500 bg-accent-600 hover:bg-accent-700" : "focus:ring-red-500 bg-red-600 hover:bg-red-700"
                  )}
                  onClick={yes}
                >
                  {yesTitle}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={no}
                  ref={cancelButtonRef}
                >
                  {noTitle}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default forwardRef(ConfirmModal);
