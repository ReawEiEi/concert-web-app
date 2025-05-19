import api from "@/api/axios";

export async function findAllCanceled() {
    try {
        const response = await api.get(`/history/action/Cancel`);
        return response.data;
    } catch (error) {
        console.error("Error fetching canceled:", error);
        throw error;
    }
}
