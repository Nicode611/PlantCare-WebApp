// Use the generated Task type from Prisma
import type { Task } from "@prisma/client";
import prisma from "../../prisma/prismaClient";


    // GET all tasks from user
    export async function getAllTasksFromUser(userId: string): Promise<Task[]> {
        try {
            const parsedUserId: number = parseInt(userId, 10)
            const tasks = await prisma.task.findMany({
                where: { userId: parsedUserId },
                include: { plant: true },
            });
            return tasks;
        } catch (error) {
            console.error("Error service, while getting all tasks from user :", error);
            throw error;
        }
    }

    // GET specific task
    export async function getSpecificTask(taskId: string): Promise<Task | null> {
        try {
            const parsedTaskId: number = parseInt(taskId, 10)
            const task = await prisma.task.findUnique({
                where: { id: parsedTaskId },
                include: { plant: true },
            });
            return task;
        } catch (error) {
            console.error("Error service, while getting specific task :", error);
            throw error;
        }
    }

    // POST Create task 
    export async function createTask(userId: string, plantId: string, action: string, dateOfAction: Date): Promise<Task> {
        try {
            const parsedUserId: number = parseInt(userId, 10)
            const parsedPlantId: number = parseInt(plantId, 10)
            const task = await prisma.task.create({
                data: {
                    userId: parsedUserId,
                    plantId: parsedPlantId,
                    action,
                    dateOfAction,
                    isDone: false,
                },
                include: { plant: true },
            });
            return task;
        } catch (error) {
            console.error("Error service, while creating task :", error);
            throw error;
        }
    }

    // UPDATE check / uncheck task 
    export async function checkTask(taskId: string, isDone: boolean): Promise<Task> {
        try {
            const parsedTaskId: number = parseInt(taskId, 10)
            const task = await prisma.task.update({
                where: { id: parsedTaskId },
                data: {
                    isDone,
                },
                include: { plant: true },
            });
            return task;
        } catch (error) {
            console.error("Error service, while checking task :", error);
            throw error;
        }
    }

    // DELETE task 
    export async function deleteTask(taskId: string): Promise<Task | null> {
        try {
            const parsedTaskId: number = parseInt(taskId, 10)
            const task = await prisma.task.delete({
                where: { id: parsedTaskId },
                include: { plant: true },
            });
            return task;
        } catch (error) {
            console.error("Error service, while deleting task :", error);
            throw error;
        }
    }

    // DELETE all tasks from user
    export async function deleteAllTasksFromUser(userId: string): Promise<number> {
        try { 
            const parsedUserId: number = parseInt(userId, 10);
            const result = await prisma.task.deleteMany({
                where: { userId: parsedUserId },
            });
            return result.count;
        } catch (error) {
            console.error("Error service, while deleting all tasks from user :", error);
            throw error;
        }
    }

    // DELETE all tasks from plant
    export async function deleteAllTasksFromPlant(plantId: string): Promise<number> {
        try {
            const parsedUserId: number = parseInt(plantId, 10);
            const result = await prisma.task.deleteMany({
                where: { userId: parsedUserId },
            });
            return result.count;
        } catch (error) {
            console.error("Error service, while deleting all tasks from plant :", error);
            throw error;
        }
    }         





