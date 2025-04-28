import axios from "axios";

export async function refreshData() {
    try {
        const [tasksResponse, plantsResponse] = await Promise.all([
            axios.get(`/api/cron/tasks`),
            axios.get(`/api/cron/plants`)
        ]);

        return {
            tasks: tasksResponse.data,
            plants: plantsResponse.data
        };
    } catch (error) {
        console.error("Error when calling the API:", error);
        return null;
    }
}