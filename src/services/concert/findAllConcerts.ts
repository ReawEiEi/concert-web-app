import api from "@/api/axios";

export async function findAllConcerts() {
    try {
        const response = await api.get(`/concert/findAllConcerts`);
        return response.data;
    } catch (error) {
        console.error("Error fetching concerts:", error);
        throw error;
    }
}
