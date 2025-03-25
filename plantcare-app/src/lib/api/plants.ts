import axios from "axios"


export interface Plant {
    id: number;
    modelId: number;
    location: string;
    lastWateredAt: Date;
    actualWaterLvl: number;
    model: {
        name: string;
        wateringFrequency: number;
        waterLvlNeeded: number;
        sunLvlNeeded: number;
        image: string;
    }

}

// Request GET to get all the plants from a user id
export async function getPlantsFromUser(id: number): Promise<Plant[]> {
    try {
        const response = await axios.get<Plant[]>(`http://localhost:3001/api/users/${id}/plants`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des plantes pour l'utilisateur ${id} :`, error);
        return [];
    }
}

// Request GET to get a specific plant from an id
export async function getSpecificPlant(plantId: number): Promise<Plant | null>  {
    try {
        const response = await axios.get<Plant>(`http://localhost:3001/api/plants/${plantId}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération de la plante ${plantId} :`, error);
        return null;
    }
}


// Request POST to create a plant 
export async function createPlant({ userId, modelId, location }: {
    userId: number;
    modelId: number;
    location: string;
}): Promise<Plant | null> {
    try {
        const response = await axios.post<Plant>('http://localhost:3001/api/plants', {
            userId,
            modelId,
            location,
            lastWateredAt: new Date().toISOString(),
        });
        console.log("Plant created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur attrapée lors de l'appel a l'API :", error);
        return null;
    }
}