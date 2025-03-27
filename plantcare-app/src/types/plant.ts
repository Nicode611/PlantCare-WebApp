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
