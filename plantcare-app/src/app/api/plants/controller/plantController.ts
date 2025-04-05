import * as PlantService from "../services/plantService";


    export async function createPlant(userId: string, data: { modelId: number, location: string }) {
        const { modelId, location } = data;
        return await PlantService.createPlant(userId, modelId, location)
    }

    export async function getSpecificPlant(plantId: string) {
        return await PlantService.getSpecificPlant(plantId);
    }

    export async function getPlantsFromUser(userId: string) {
        return await PlantService.getPlantsFromUser(userId);
    }

    export async function updateWaterLvl(plantId: string, data: { actualWaterLvl: number, lastWateredAt: string }) {
        const { actualWaterLvl, lastWateredAt } = data;
        return await PlantService.updateWaterLvl(plantId, actualWaterLvl, lastWateredAt);
    }