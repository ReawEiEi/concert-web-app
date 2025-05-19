import api from "@/api/axios";

export async function findAllReserved() {
    try {
        const response = await api.get(`/history/action/Reserve`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reserved:", error);
        throw error;
    }
}
