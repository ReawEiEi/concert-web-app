"use client";

import { useState } from "react";
import { FiSave, FiUser } from "react-icons/fi";

export default function CreateSection({
    onCreate,
}: {
    onCreate: (data: {
        name: string;
        description: string | null;
        seat: number;
    }) => void;
}) {
    const [concertName, setConcertName] = useState<string>("");
    const [totalSeats, setTotalSeats] = useState<number>(100);
    const [description, setDescription] = useState<string | null>(null);

    const handleCreate = () => {
        if (concertName.trim() === "") {
            alert("Concert name is required");
            return;
        }
        if (totalSeats <= 0) {
            alert("Total seats must be greater than 0");
            return;
        }
        onCreate({
            name: concertName,
            description: description,
            seat: totalSeats,
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg border border-grey-300 mt-10">
            <div className="border-b border-gray-300 mb-6">
                <h2 className="text-3xl font-bold text-[#1692EC] mb-4">
                    Create
                </h2>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-md font-medium text-gray-700 mb-3">
                            Concert Name
                        </label>
                        <input
                            type="text"
                            value={concertName}
                            onChange={(e) => setConcertName(e.target.value)}
                            placeholder="Please input concert name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-md font-medium text-gray-700 mb-3">
                            Total of seat
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={totalSeats}
                                onChange={(e) =>
                                    setTotalSeats(Number(e.target.value))
                                }
                                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                min={1}
                                placeholder="Enter total seats"
                            />
                            <FiUser
                                className="text-black absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-md font-medium text-gray-700 mb-3">
                        Description
                    </label>
                    <textarea
                        value={description ? description : ""}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please input description"
                        rows={4}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-[#1692EC] text-white px-4 py-2 rounded hover:bg-blue-400 gap-2.5 flex items-center"
                        onClick={handleCreate}
                    >
                        <FiSave />
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
