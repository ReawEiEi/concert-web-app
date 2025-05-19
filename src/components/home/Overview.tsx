import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ConcertResponse } from "@/types/types";
import { findAllConcerts } from "@/services/concert/findAllConcerts";
import DeleteModal from "../modal/DeleteModal";
import deleteConcert from "@/services/concert/deleteConcert";
import { showSuccessToast, showErrorToast } from "../toast/Success";
import findListOfConcertIdByUserId from "@/services/reserved/findListOfConcertIdByUserId";
import createReserve from "@/services/reserved/createReserve";
import deleteReserved from "@/services/reserved/deleteReserved";
import { ConcertAction } from "@/enum/enum";
import createHistory from "@/services/history/createHistory";

export default function OverviewSection({
    isAdmin,
    onDeleteSeat,
}: {
    isAdmin?: boolean;
    onDeleteSeat?: (seatCount: number) => void;
}) {
    const [concerts, setConcerts] = useState<ConcertResponse[]>([]);
    const [reservedConcerts, setReservedConcerts] = useState<string[]>([]);

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
    
    const handleCreateHistory = async (
        userId: string,
        concertId: string,
        action: string
    ) => {
        try {
            await createHistory(userId, concertId, action);
        } catch (err) {
            showErrorToast("Failed to create history with error: " + err);
        }
    };

    const handleReserve = async (userId: string, concertId: string) => {
        try {
            await createReserve(userId, concertId);
            setReservedConcerts((prev) => [...prev, concertId]);
            showSuccessToast("Concert reserved!");
            handleCreateHistory(userId, concertId, ConcertAction.RESERVED);
        } catch (err) {
            showErrorToast("Failed to reserve concert with error: " + err);
        }
    };

    const handleCancel = async (userId: string, concertId: string) => {
        try {
            await deleteReserved(userId, concertId);
            setReservedConcerts((prev) =>
                prev.filter((id) => id !== concertId)
            );
            showSuccessToast("Reservation cancelled!");
            handleCreateHistory(userId, concertId, ConcertAction.CANCELED);
        } catch (err) {
            showErrorToast("Failed to cancel reservation with error: " + err);
        }
    };

    useEffect(() => {
        const fetchConcerts = async () => {
            const res = await findAllConcerts();
            setConcerts(res);
        };
        const fetchConcertsByUserId = async (id: string) => {
            const res = await findListOfConcertIdByUserId(id);
            setReservedConcerts(res);
        };
        fetchConcerts();
        fetchConcertsByUserId("00000000-0000-0000-0000-000000000001");
    }, []);

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
                                    className="bg-[#E84E4E] hover:bg-red-400 text-white px-4 py-2 rounded flex items-center "
                                    onClick={() => openDeleteModal(concert)}
                                >
                                    <RiDeleteBinLine className="mr-2" />
                                    Delete
                                </button>
                            ) : reservedConcerts.includes(concert.id) ? (
                                <button
                                    className="bg-[#E84E4E] hover:bg-red-400 text-white px-4 py-2 rounded flex items-center justify-center w-1/3 md:w-1/8 font-semibold"
                                    onClick={() =>
                                        handleCancel(
                                            "00000000-0000-0000-0000-000000000001",
                                            concert.id
                                        )
                                    }
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    className="bg-[#1692EC] hover:bg-blue-400 text-white px-4 py-2 rounded flex items-center justify-center w-1/3 md:w-1/8 font-semibold"
                                    onClick={() =>
                                        handleReserve(
                                            "00000000-0000-0000-0000-000000000001",
                                            concert.id
                                        )
                                    }
                                >
                                    Reserved
                                </button>
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
