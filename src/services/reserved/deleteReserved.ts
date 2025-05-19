import api from "@/api/axios";

export default async function deleteReserved(
    userId: string,
    concertId: string
) {
    try {
        const response = await api.delete(
            `/reserved/delete/${userId}/${concertId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting reserved:", error);
        throw error;
    }
}
