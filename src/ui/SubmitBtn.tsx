import clsx from "clsx";
import { Loader } from "../components/Loader";

type SubmitBtnProps = {
  loader: boolean;
  label: string;
  isProcess: string;
};

export const SubmitBtn = ({ loader, label, isProcess }: SubmitBtnProps) => {
  return (
    <button
      type="submit"
      className={clsx(
        "w-full text-white p-2 rounded transition-all duration-200",
        {
          "bg-blue-600 hover:bg-blue-700": !loader,
          "bg-gray-600": loader,
        }
      )}
      disabled={loader}
    >
      {loader ? (
        <div className="flex items-center justify-center gap-3">
          <Loader className="h-1" /> <span>{isProcess} </span>
        </div>
      ) : (
        <span>{label} </span>
      )}
    </button>
  );
};
