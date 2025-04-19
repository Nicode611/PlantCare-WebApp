import prisma from "@/app/api/prisma/prismaClient";
/* import { Model } from "../types/model"; */

    export async function getModels() {    
        try {

            const models = await prisma.model.findMany();

            if (models.length === 0) {
                return [];
            }

            return models;
        } catch (error) {
            console.error(`Erreur lors de la récupération des models :`, error);
            throw new Error("Une erreur est survenue lors de la récupération des models.");
        }
    }
