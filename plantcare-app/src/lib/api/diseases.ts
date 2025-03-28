import axios from "axios"
import { Disease } from "@/types/disease";


// Request GET to get all the plants model
export async function getDiseasesFromPlantModel(plantModelId: number): Promise<Disease[]> {
    try {
        const response = await axios.get<Disease[]>(`http://localhost:3001/api/diseases/${plantModelId}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des diseases :`, error);
        return [];
    }
}