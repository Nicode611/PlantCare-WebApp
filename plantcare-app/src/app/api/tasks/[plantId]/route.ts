import { NextResponse } from 'next/server';
import * as TaskController from '../controller/taskController';

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