import api from "@/api/axios";

export default async function deleteConcert(id: string) {
    try {
        const response = await api.delete(`/concert/deleteConcert/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting concert:", error);
        throw error;
    }
}