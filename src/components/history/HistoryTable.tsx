"use client";
import formatDate from "@/app/function/formatDate";
import { findAllHistory } from "@/services/history/findAllHistory";
import { findAllHistoryByUserId } from "@/services/history/findAllHistoryByUserId";
import { HistoryResponse } from "@/types/types";
import { useEffect, useState } from "react";

export default function HistoryTable({ isAdmin }: { isAdmin?: boolean }) {
    const [history, setHistory] = useState<HistoryResponse[]>([]);
    const [loading, setLoading] = useState(true);

    if (isAdmin) {
        useEffect(() => {
            const fetchHistory = async () => {
                const res = await findAllHistory();
                setHistory(res);
                setLoading(false);
            };
            fetchHistory();
        }, []);
    } else {
        useEffect(() => {
            const fetchHistoryByUserId = async (id: string) => {
                const res = await findAllHistoryByUserId(id);
                console.log(res);
                setHistory(res);
                setLoading(false);
            };
            //TODO: Use real user id
            fetchHistoryByUserId("00000000-0000-0000-0000-000000000001");
        }, []);
    }

    return (
        <div className="flex flex-col min-h-screen p-10">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-400 px-4 py-2 text-left">
                                    Date time
                                </th>
                                <th className="border border-gray-400 px-4 py-2 text-left">
                                    Username
                                </th>
                                <th className="border border-gray-400 px-4 py-2 text-left">
                                    Concert name
                                </th>
                                <th className="border border-gray-400 px-4 py-2 text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((record, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {formatDate(record.createdAt)}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {record.user.username}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {record.concert.name}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {record.action}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
