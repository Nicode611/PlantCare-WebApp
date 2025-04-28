import * as PlantService from "../services/plantService";
import * as TaskService from "../../tasks/services/taskService";


export async function createPlant(userId: string, data: { modelId: number, location: string }) {
    const { modelId, location } = data;
    // 1) Create the plant
    const newPlant = await PlantService.createPlant(userId, modelId, location);

    // 2) Update the next watering date
    const plant = await PlantService.updateNextWateringDate(newPlant.id.toString());

    // 3) Create the initial task for the new plant
    if (plant.nextWateringDate !== null) {
        await TaskService.createTask(
        userId,
        plant.id.toString(),
        "water",
        plant.nextWateringDate
        );
    }
    // 3) Return the newly created plant
    return newPlant;
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

    export async function updateNextWateringDate(plantId: string) {
        return await PlantService.updateNextWateringDate(plantId);
    }