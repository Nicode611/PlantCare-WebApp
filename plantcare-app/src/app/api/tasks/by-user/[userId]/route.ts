import { NextResponse } from 'next/server';
import * as TaskController from '../../controller/taskController';

// GET all tasks from user
export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const awaitedParams = await Promise.resolve(params);
        const userId = awaitedParams.userId;

        // Call the controller
        const tasks = await TaskController.getAllTasksFromUser(userId);
        return NextResponse.json(tasks);
    } catch (error) {
        const awaitedParams = await Promise.resolve(params);
        console.error(`Error while fetching tasks for user ${awaitedParams.userId}:`, error);
        return NextResponse.json(
            { error: "Error while fetching tasks." },
            { status: 500 }
        );
    }
}

// POST create task
export async function POST(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const awaitedParams = await Promise.resolve(params);
        const userId = awaitedParams.userId;
        const body = await request.json();

        // Call the controller
        const task = await TaskController.createTask(userId, body);
        return NextResponse.json(task);
    } catch (error) {
        const awaitedParams = await Promise.resolve(params);
        console.error(`Error while creating task for user ${awaitedParams.userId}:`, error);
        return NextResponse.json(
            { error: "Error while creating task." },
            { status: 500 }
        );
    }
}

// DELETE delete all tasks from user
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const awaitedParams = await Promise.resolve(params);
        const userId = awaitedParams.userId;

        // Call the controller
        const deletedTasks = await TaskController.deleteAllTasksFromUser(userId);
        return NextResponse.json(deletedTasks);
    } catch (error) {
        const awaitedParams = await Promise.resolve(params);
        console.error(`Error while deleting tasks for user ${awaitedParams.userId}:`, error);
        return NextResponse.json(
            { error: "Error while deleting tasks." },
            { status: 500 }
        );
    }
}