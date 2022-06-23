import clsx from "clsx";
import { useTransition } from "remix";

interface Props {
  small?: boolean;
  loading?: boolean;
}
export default function Loading({ small = false, loading }: Props) {
  const transition = useTransition();
  return (
    <>
      {(transition.state === "submitting" || transition.state === "loading" || loading) && (
        <div className="pt-4 space-y-2 pb-4 text-center">
          <div className={clsx("h-auto w-full flex justify-center py-12 flex-col text-center space-y-4", small && "py-2")}>
            <div
              className={clsx("loader ease-linear rounded-full border-slate-200 mx-auto", small ? "h-10 w-10 border-t-4" : "h-20 w-20 border-t-8 border-8")}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
