import axios from "axios"
import { Model } from "@/types/model";


// Request GET to get all the plants model
export async function getPlantsModel(): Promise<Model[]> {
    try {
        const response = await axios.get<Model[]>(`http://localhost:3001/api/models`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des modeles :`, error);
        return [];
    }
}