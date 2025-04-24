import * as taskService from "../services/taskService";

// [userId]/route.ts
export async function getAllTasksFromUser(userId: string) {
    return await taskService.getAllTasksFromUser(userId);
}   

// [taskId]/route.ts
export async function getSpecificTask(taskId: string) {
    return await taskService.getSpecificTask(taskId);
}

// [userId]/route.ts
export async function createTask(userId: string, data: { plantId: string, action: string, dateOfAction: Date }) {
    const { plantId, action, dateOfAction } = data;
    return await taskService.createTask(userId, plantId, action, dateOfAction);
}

// [taskId]/route.ts
export async function checkTask(taskId: string, data: { isDone: boolean }) {
    const { isDone } = data;
    return await taskService.checkTask(taskId, isDone);
}

// [taskId]/route.ts
export async function deleteTask(taskId: string) {
    return await taskService.deleteTask(taskId);
}

// [userId]/route.ts
export async function deleteAllTasksFromUser(userId: string) {
    return await taskService.deleteAllTasksFromUser(userId);
}

// [plantId]/route.ts
export async function deleteAllTasksFromPlant(plantId: string) {
    return await taskService.deleteAllTasksFromPlant(plantId);
}