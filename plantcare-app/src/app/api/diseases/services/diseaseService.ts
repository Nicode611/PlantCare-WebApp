import prisma from "@/app/api/prisma/prismaClient";
/* import { Disease } from "../types/disease"; */


    export async function getDiseasesFromPlantModel(plantModelId: string) {    
        try {
            const id: number = parseInt(plantModelId, 10)

            const disease = await prisma.disease.findMany({
                where: {
                    models: {
                      some: {
                        modelId: id,
                      },
                    },
                  }
            });

            if (disease.length === 0) {
                return [];
            }

            return disease;
        } catch (error) {
            console.error(`Erreur lors de la récupération des models :`, error);
            throw new Error("Une erreur est survenue lors de la récupération des models.");
        }
    }
