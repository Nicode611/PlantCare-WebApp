import prisma from "../../prisma/prismaClient";
import { Plant } from "../types/plant";


    // Create plant service
    export async function createPlant(userId: string, modelId: number, location: string): Promise<Plant>   {    

        try {
            const parsedUserId: number = parseInt(userId, 10)
            const plant = await prisma.plant.create({
                data: {
                    userId: parsedUserId,
                    modelId,
                    location,
                    actualWaterLvl: 10,
                    lastWateredAt: new Date(),
                },
            })
            return plant;
        } catch(error) {
            console.error("Error service, while creating the plant :", error);
            throw error;
        }
    }

    // Get specific plant
    export async function getSpecificPlant(plantId: string): Promise<Plant | null> {
        try {
               
            const actualPlantId: number = parseInt(plantId, 10)
            const plant = await prisma.plant.findUnique({
            where: { id: actualPlantId },
            include: { model: true }, // inclut des relations si nécessaire
          });
          return plant;
        } catch (error) {
          console.error("Erreur lors de la récupération de la plante dans le service:", error);
          throw error;
        }
      }

    // Get plants from user service
    export async function getPlantsFromUser(userId: string) {    
        try {
            const id: number = parseInt(userId, 10)

            const plants = await prisma.plant.findMany({
                where: { userId: id },
                include: {
                    model: true, 
                },
            });

            if (plants.length === 0) {
                return []
            }

            return plants;
        } catch (error) {
            console.error(`Erreur lors de la récupération des plantes de l'utilisateur ${userId}:`, error);
            throw new Error("Une erreur est survenue lors de la récupération des plantes.");
        }
    }

    // Update water lvl of a plant
    export async function updateWaterLvl(plantId: string, actualWaterLvl: number, lastWateredAt: string): Promise<Plant>  {    
        try {
            const actualPlantId: number = parseInt(plantId, 10)
            const plant = await prisma.plant.update({
                where: { id: actualPlantId },
                data: {
                    actualWaterLvl: actualWaterLvl,
                    lastWateredAt: new Date(lastWateredAt),
                  }
            });

            if (plant === null) {
                throw new Error(`Aucune plante trouvée ${plantId}`);
            }
            return plant;
        } catch (error) {
            console.error(`Erreur lors de la récupération de la plante ${plantId}:`, error);
            throw new Error("Une erreur est survenue lors de la récupération de la plante.");
        }
    }

