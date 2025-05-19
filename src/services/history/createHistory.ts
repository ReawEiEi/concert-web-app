import api from "@/api/axios";

export default async function createHistory(
    userId: string,
    concertId: string,
    action: string
){
    try {
        const response = await api.post("/history", {
            userId,
            concertId,
            action,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating history:", error);
        throw new Error("Failed to create history");
    }
}
