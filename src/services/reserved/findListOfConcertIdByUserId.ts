import api from "@/api/axios";

export default async function findListOfConcertIdByUserId(id: string) {
    try {
        const response = await api.get(`/reserved/concerts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching concert IDs by user ID:", error);
        throw error;
    }
}
