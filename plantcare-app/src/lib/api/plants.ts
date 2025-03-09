export interface Plant {
    id: number;
    name: string;
    description: string;
    lastWateredAt: Date;
    model: {
        name: string;
        wateringFrequency: number;
        image: string;
    }

}

// Request GET to get all the plants from a user id
export async function getPlantsFromUser(id: number): Promise<Plant[]> {
    try {
        const res = await fetch(`http://localhost:3001/api/plants/${id}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch plants for user ${id}: ${res.statusText}`);
        }

        const data = await res.json(); // Appelle la fonction et récupère les données
        console.log(data);
        return await data;
    } catch (error) {
        console.error("Erreur attrapée :", error);
        return []; // Retourne un tableau vide en cas d'erreur pour éviter un crash
    }
}

// Request POST to create a plant 
export async function createPlant({ userId, plantModelId, description }: {
    userId: number;
    plantModelId: number;
    description?: string;
}): Promise<Plant | null> {
    try {
    const res = await fetch("http://localhost:3001/api/plants", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        userId,
        modelId: plantModelId,
        description: description || null, 
        lastWateredAt: new Date().toISOString(), 
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to create plant: ${res.statusText}`);
    }

    const plant: Plant = await res.json();
    console.log("Plant created:", plant);
    return plant;

    } catch (error) {
    console.error("Erreur attrapée :", error);
    return null;
    }
}