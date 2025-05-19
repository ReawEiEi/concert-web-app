import api from "@/api/axios";

export async function findAllSeats() {
    try {
        const response = await api.get(`/concert/findAllSeats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching seats:", error);
        throw error;
    }
}
