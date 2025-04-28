import axios from "axios"
import type { Task } from "@prisma/client"

// api/tasks/[userId]/route.ts

// GET all tasks from user
export async function getAllTasksFromUser(userId: string): Promise<Task[]> {
    try {
        const response = await axios.get<Task[]>(`/api/tasks/by-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return [];
    }
}

// POST Create task 
export async function createTask({ userId, plantId, action, dateOfAction }: {
    userId: string;
    plantId: string;
    action: string;
    dateOfAction: Date;
}): Promise<Task | null> {
    try {
        const response = await axios.post<Task>(`/api/tasks/by-user/${userId}`, {
            plantId,
            action,
            dateOfAction,
        });
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}

// DELETE all tasks from user
export async function deleteAllTasksFromUser(userId: string): Promise<Task[] | null> {
    try {
        const response = await axios.delete<Task[]>(`/api/tasks/by-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}


// api/tasks/[plantId]/route.ts

// DELETE all tasks from plant
export async function deleteAllTasksFromPlant(plantId: string): Promise<Task[] | null> {
    try {
        const response = await axios.delete<Task[]>(`/api/tasks/by-plant/${plantId}`);
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}

// GET specific task
export async function getSpecificTask(taskId: string): Promise<Task | null> {
    try {
        const response = await axios.get<Task>(`/api/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}


// api/tasks/[taskId]/route.ts

// PATCH check / uncheck task
export async function checkTask(taskId: string, isDone: boolean): Promise<Task | null> {
    try {
        const response = await axios.patch<Task>(`/api/tasks/${taskId}`, {
            isDone,
        });
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}

// PATCH update severity lvl 
export async function updateSeverityLevelFromPlant(plantId: string, severityLvl: string): Promise<Task[] | null> {
    try {
        const response = await axios.patch<Task[]>(`/api/tasks/by-plant/${plantId}`, {
            severityLvl,
        });
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}

// DELETE task
export async function deleteTask(taskId: string): Promise<Task | null> {
    try {
        const response = await axios.delete<Task>(`/api/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return null;
    }
}