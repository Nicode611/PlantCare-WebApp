import axios from "axios"
import { User } from "@/types/user";


// /api/users

// Request GET to get all the plants from a user id
export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await axios.get<User[]>(`/api/users`);
        return response.data;
    } catch (error) {
        console.error("Error when calling the API :", error);
        return [];
    }
}