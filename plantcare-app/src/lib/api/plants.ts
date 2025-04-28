import axios from "axios"
import { Plant } from "@/types/plant";


// /api/plants/users/${userId}

// Request GET to get all the plants from a user id
export async function getPlantsFromUser(userId: string): Promise<Plant[]> {
    try {
        const response = await axios.get<Plant[]>(`/api/plants/by-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return [];
    }
}

// Request POST to create a plant 
export async function createPlant({ userId, modelId, location }: {
    userId: number;
    modelId: number;
    location: string;
}): Promise<Plant | null> {
    try {
        const response = await axios.post<Plant>(`/api/plants/by-user/${userId}`, {
            userId,
            modelId,
            location,
            lastWateredAt: new Date().toISOString(),
        });
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}


// /api/plants/${plantId}

// Request GET to get a specific plant from an id
export async function getSpecificPlant(plantId: number): Promise<Plant | null>  {
    try {
        const response = await axios.get<Plant>(`/api/plants/${plantId}`);
        return response.data;
    } catch (error) {
        console.error(`Error when calling the API :`, error);
        return null;
    }
}

// Request UPDATE to set the water lvl of a plant
export async function updateWaterLvl(plantId: number, lastWateredAt: Date){
    try {
        const response = await axios.patch(`/api/plants/${plantId}`, {
            actualWaterLvl: 100,
            lastWateredAt: lastWateredAt,
        });
        return response.data
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}

// Request UPDATE to set the NextWateringDate of a plant
export async function updateNextWateringDate(plantId: number){
    try {
        const response = await axios.patch<Plant>(
          `/api/plants/${plantId}`,
          {},
          { params: { action: 'updateNextWateringDate' } }
        );
        return response.data
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}

// /api/plants/${plantId}