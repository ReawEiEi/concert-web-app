"use client";

import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { SlBadge } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";
import Card from "@/components/home/Card";
import OverviewSection from "@/components/home/Overview";
import CreateSection from "@/components/home/Create";
import { findAllSeats } from "@/services/concert/findAllSeats";
import { findAllReserved } from "@/services/history/findAllReserved";
import { findAllCanceled } from "@/services/history/findAllCanceled";
import { showErrorToast, showSuccessToast } from "@/components/toast/Success";
import createConcert from "@/services/concert/createConcert";

export default function AdminHomePage() {
    const [seats, setSeats] = useState(0);
    const [reserved, setReserved] = useState(0);
    const [canceled, setCanceled] = useState(0);
    const [tab, setTab] = useState<"overview" | "create">("overview");

    useEffect(() => {
        const fetchSeats = async () => {
            const res = await findAllSeats();
            setSeats(res);
        };
        const fetchReserved = async () => {
            const res = await findAllReserved();
            setReserved(res);
        };
        const fetchCanceled = async () => {
            const res = await findAllCanceled();
            setCanceled(res);
        };
        fetchSeats();
        fetchReserved();
        fetchCanceled();
    }, []);

    const handleCreate = async (data: {
        name: string;
        description: string | null;
        seat: number;
    }) => {
        try {
            await createConcert(data);
            showSuccessToast("Created successfully!");
            setTab("overview");
            setSeats((prev) => prev + data.seat);
        } catch (err) {
            showErrorToast(`Failed to create concert with error: ${err}`);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                <Card
                    title="Total of seats"
                    count={seats}
                    icon={<FiUser size={24} />}
                    color="bg-[#0070A4]"
                />
                <Card
                    title="Reserve"
                    count={reserved}
                    icon={<SlBadge size={24} />}
                    color="bg-[#00A58B]"
                />
                <Card
                    title="Cancel"
                    count={canceled}
                    icon={<MdOutlineCancel size={24} />}
                    color="bg-[#E84E4E]"
                />
            </div>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setTab("overview")}
                    className={`px-4 py-2 ${
                        tab === "overview"
                            ? "border-[#1692EC] text-[#1692EC] border-b-2 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setTab("create")}
                    className={`px-4 py-2 ${
                        tab === "create"
                            ? "border-[#1692EC] text-[#1692EC] border-b-2 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    Create
                </button>
            </div>

            {tab === "overview" ? (
                <OverviewSection
                    type="Admin"
                    onDeleteSeat={(deletedSeats) =>
                        setSeats((prev) => prev - deletedSeats)
                    }
                />
            ) : (
                <CreateSection onCreate={handleCreate} />
            )}
        </div>
    );
}
