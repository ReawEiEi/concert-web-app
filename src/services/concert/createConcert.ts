import api from "@/api/axios";

export default async function createConcert({
    name,
    description,
    seat,
}: {
    name: string;
    description: string | null;
    seat: number;
}) {
    try {
        const response = await api.post("/concert/createConcert", {
            name: name,
            description: description,
            seat: seat,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating concert:", error);
        throw error;
    }
}
