import api from "@/api/axios";

export async function findAllHistory() {
    try {
        const response = await api.get(`/history`);
        return response.data;
    } catch (error) {
        console.error("Error fetching histories:", error);
        throw error;
    }
}
