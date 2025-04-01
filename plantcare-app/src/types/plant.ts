export interface Plant {
    id: number;
    modelId: number;
    location: string;
    lastWateredAt: string;
    actualWaterLvl: number;
    model: {
        name: string;
        wateringFrequency: number;
        waterLvlNeeded: number;
        sunLvlNeeded: number;
        image: string;
    }

}
