import { NextResponse } from 'next/server';
import * as TaskController from '../controller/taskController';

// GET task from taskId
export async function GET(
    request: Request,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const awaitedParams = await Promise.resolve(params);
        const taskId = awaitedParams.taskId;

        // Call the controller
        const task = await TaskController.getSpecificTask(taskId);
        return NextResponse.json(task);
    } catch (error) {
        const awaitedParams = await Promise.resolve(params);
        console.error(`Error while fetching task ${awaitedParams.taskId}:`, error);
        return NextResponse.json(
            { error: "Error while fetching task." },
            { status: 500 }
        );
    }
}

// PATCH check / uncheck task or update severity level
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const awaitedParams = await Promise.resolve(params);
        const taskId = awaitedParams.taskId;
        const body = await request.json();

        if (body.isDone) {
            const updatedTask = await TaskController.checkTask(taskId, body.isDone);
            return NextResponse.json(updatedTask);
        } else if (body.severityLvl) {
            const updatedTask = await TaskController.updateSeverityLevelFromTask(taskId,body.severityLvl);
            return NextResponse.json(updatedTask);
        }
        
    } catch (error) {
        const awaitedParams = await Promise.resolve(params);
        console.error(`Error while updating task ${awaitedParams.taskId}:`, error);
        return NextResponse.json(
            { error: "Error while updating task." },
            { status: 500 }
        );
    }
}

// DELETE delete task
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const awaitedParams = await Promise.resolve(params);
        const taskId = awaitedParams.taskId;

        // Call the controller
        const deletedTask = await TaskController.deleteTask(taskId);
        return NextResponse.json(deletedTask);
    } catch (error) {
        const awaitedParams = await Promise.resolve(params);
        console.error(`Error while deleting task ${awaitedParams.taskId}:`, error);
        return NextResponse.json(
            { error: "Error while deleting task." },
            { status: 500 }
        );
    }
}