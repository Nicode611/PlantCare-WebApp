export interface Task {
    id: number;
    userId: string;
    plantId: number;
    action: string;
    dateOfAction: Date;
    severityLvl: string;
    isDone: boolean;
    plant: {
        id: number;
        name: string;
        imageUrl: string;
        userId: number;
    };
}