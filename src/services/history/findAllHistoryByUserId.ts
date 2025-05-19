import api from "@/api/axios";

export async function findAllHistoryByUserId(id: string) {
    try {
        const response = await api.get(`/history/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching histories:", error);
        throw error;
    }
}
