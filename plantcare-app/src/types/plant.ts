export interface Plant {
    id: number;
    userId: string;
    modelId: number;
    location: string;
    image: string | null;
    lastWateredAt: string;
    actualWaterLvl: number;
    nextWateringDate: number
    sendWaterMailAlert: boolean;
    model: {
        name: string;
        description: string;
        wateringFrequency: number;
        waterLvlNeeded: number;
        sunLvlNeeded: number;
        image: string;
        soil: string;
        pestResistant: string;
        temperature: string;
    }

}
