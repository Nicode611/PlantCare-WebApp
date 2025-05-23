export interface Plant {
    id: number;
    userId: string;
    modelId: number;
    location: string;
    lastWateredAt: string;
    actualWaterLvl: number;
    nextWateringDate: number
    sendWaterMailAlert: boolean;
    model: {
        name: string;
        wateringFrequency: number;
        waterLvlNeeded: number;
        sunLvlNeeded: number;
        image: string;
        soil: string;
        pestResistant: string;
        temperature: string;
    }

}
