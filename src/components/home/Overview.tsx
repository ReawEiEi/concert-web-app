import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ConcertResponse } from "@/types/types";
import { findAllConcerts } from "@/services/concert/findAllConcerts";
import DeleteModal from "../modal/DeleteModal";
import deleteConcert from "@/services/concert/deleteConcert";
import { showSuccessToast, showErrorToast } from "../toast/Success";

//TODO : Make User button
export default function OverviewSection({
    isAdmin,
    onDeleteSeat,
}: {
    isAdmin?: boolean;
    onDeleteSeat?: (seatCount: number) => void;
}) {
    const [concerts, setConcerts] = useState<ConcertResponse[]>([]);

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedConcert, setSelectedConcert] =
        useState<ConcertResponse | null>(null);

    const openDeleteModal = (concert: ConcertResponse) => {
        setSelectedConcert(concert);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (selectedConcert) {
            try {
                await deleteConcert(selectedConcert.id);
                setConcerts((prevConcerts) =>
                    prevConcerts.filter(
                        (concert) => concert.id !== selectedConcert.id
                    )
                );
                showSuccessToast("Deleted successfully!");
                if (onDeleteSeat) {
                    onDeleteSeat(selectedConcert.seat);
                }
            } catch (err) {
                showErrorToast(`Failed to delete concert with error: ${err}`);
            }
            setDeleteModalOpen(false);
        }
    };

    if (isAdmin) {
        useEffect(() => {
            const fetchConcerts = async () => {
                const res = await findAllConcerts();
                setConcerts(res);
            };
            fetchConcerts();
        }, []);
    }
    return (
        <>
            <div className="space-y-6">
                {concerts.map((concert) => (
                    <div
                        key={concert.id}
                        className="border border-[#C2C2C2] rounded-lg p-6"
                    >
                        <h2 className="text-xl font-bold text-[#1692EC]">
                            {concert.name}
                        </h2>
                        <p className="mt-2 text-black">{concert.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center text-black">
                                <FiUser className="mr-1" />
                                {concert.seat}
                            </div>
                            {isAdmin ? (
                                <button
                                    className="bg-[#E84E4E] hover:bg-red-400 text-white px-4 py-2 rounded flex items-center"
                                    onClick={() => openDeleteModal(concert)}
                                >
                                    <RiDeleteBinLine className="mr-2" />
                                    Delete
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                name={selectedConcert?.name || ""}
            />
        </>
    );
}
