import { NextResponse } from 'next/server';
import * as TaskController from '../../controller/taskController';

// PATCH update severity level
export async function PATCH(
    request: Request,
    { params }: { params: { plantId: string } }
) {
    try {
        const awaitedParams = await Promise.resolve(params);
        const plantId = awaitedParams.plantId;
        const body = await request.json();

        if (body.severityLvl) {
            const updatedTask = await TaskController.updateSeverityLevelFromPlant(plantId, body.severityLvl);
            return NextResponse.json(updatedTask);
        }
        else {
            return NextResponse.json(
                { error: "Missing severityLvl in request body." },
                { status: 400 }
            );
        }
        
    } catch (error) {
        const awaitedParams = await Promise.resolve(params);
        console.error(`Error while updating task ${awaitedParams.plantId}:`, error);
        return NextResponse.json(
            { error: "Error while updating task." },
            { status: 500 }
        );
    }
}

// DELETE all tasks from plant
export async function DELETE(
    request: Request,
    { params }: { params: { plantId: string } }
) {
    try {
        const awaitedParams = await Promise.resolve(params);
        const plantId = awaitedParams.plantId;

        // Call the controller
        const deletedTasks = await TaskController.deleteAllTasksFromPlant(plantId);
        return NextResponse.json(deletedTasks);
    } catch (error) {
        const awaitedParams = await Promise.resolve(params);
        console.error(`Error while deleting tasks for plant ${awaitedParams.plantId}:`, error);
        return NextResponse.json(
            { error: "Error while deleting tasks." },
            { status: 500 }
        );
    }
}