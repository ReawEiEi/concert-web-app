import api from "@/api/axios";

export default async function createReserve(
    userId: string,
    concertId: string
): Promise<void> {
    try {
        const response = await api.post("/reserved", {
            userId: userId,
            concertId: concertId,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating reserve:", error);
        throw error;
    }
}
