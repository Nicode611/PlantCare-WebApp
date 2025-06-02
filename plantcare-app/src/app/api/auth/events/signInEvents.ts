import { adjustWaterLevel, createTaskIfNeeded, updateTaskSeverityLevel } from "@/app/api/cron/tasks";


export async function signInEvents() {


    // Call the function to adjust water level
    try {
        await adjustWaterLevel();
    } catch (error) {
        console.error("Error in signInCallbacks:", error);
        throw error;
    }

  // Call the function to create tasks if needed
    try {
        await createTaskIfNeeded();
    } catch (error) {
        console.error("Error in signInCallbacks:", error);
        throw error;
    }

    // Call the function to update severityLvl of tasks if needed
    try {
        await updateTaskSeverityLevel();
    } catch (error) {
        console.error("Error in signInCallbacks:", error);
        throw error;
    }
}