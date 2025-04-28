export interface Task {
    id: number;
    userId: number;
    plantId: number;
    action: string;
    dateOfAction: Date;
    severityLvl: string;
    isDone: boolean;
    plant?: {
        actualWaterLvl: number;
        id: number;
        lastWateredAt: Date;
        location: string;
        modelId: number;
        nextWateringDate: Date | null;
        userId: number;
        model: {
            id: number;
            name: string;
            description: string;
            wateringFrequency: number;
            waterLvlNeeded: number;
            sunLvlNeeded: number;
            image: string | null;
        };
    };
  }