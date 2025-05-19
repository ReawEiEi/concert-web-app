import { FiX } from "react-icons/fi";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    name: string;
}

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    name,
}: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                <div className="flex justify-center">
                    <div className="bg-red-500 rounded-full p-2 mb-4">
                        <FiX className="text-white text-2xl" />
                    </div>
                </div>
                <h3 className="text-center text-lg font-semibold mb-2">
                    Are you sure to delete?
                </h3>
                <p className="text-center text-md font-medium mb-6">"{name}"</p>
                <div className="flex justify-between gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-400 px-4 py-2 rounded text-black hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-[#E84E4E] text-white px-4 py-2 rounded hover:bg-red-400"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
