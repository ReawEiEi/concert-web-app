import toast from "react-hot-toast";
import { FiCheckCircle, FiX, FiXCircle } from "react-icons/fi";

export const showSuccessToast = (message: string) => {
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-1/2 bg-[#D0E7D2] text-black shadow-md rounded-lg pointer-events-auto flex justify-between items-center px-4 py-3`}
        >
            <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <p className="text-sm">{message}</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)}>
                <FiX />
            </button>
        </div>
    ));
};

export const showErrorToast = (message: string) => {
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-1/2 bg-[#FAD4D4] text-black shadow-md rounded-lg pointer-events-auto flex justify-between items-center px-4 py-3`}
        >
            <div className="flex items-center gap-2">
                <FiXCircle className="text-red-500" />
                <p className="text-sm">{message}</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)}>
                <FiX />
            </button>
        </div>
    ));
};
