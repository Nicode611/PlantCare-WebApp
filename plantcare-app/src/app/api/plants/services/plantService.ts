import type { Prisma } from "@prisma/client";
import prisma from "../../prisma/prismaClient";
export type Plant = Prisma.PlantGetPayload<{
    include: { model: true }
  }>;


    // Create plant service
    export async function createPlant(userId: string, modelId: number, location: string): Promise<Plant>   {    

        try {
            const plant = await prisma.plant.create({
                data: {
                    userId,
                    modelId,
                    location,
                    actualWaterLvl: 100,
                    lastWateredAt: new Date(),
                },
                include: { model: true },
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
            include: { model: true },
          });
          return plant;
        } catch (error) {
          console.error("Erreur lors de la récupération de la plante dans le service:", error);
          throw error;
        }
      }

    // Get plants from user service
    export async function getPlantsFromUser(userId: string): Promise<Plant[]> {    
        try {

            const plants = await prisma.plant.findMany({
                where: { userId: userId },
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
                },
                include: { model: true },
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


    // Update next watering date of a plant
    export async function updateNextWateringDate(plantId: string) : Promise<Plant>  {    
        try {
            // Return dates Array with every days between startDate and endDate
            function generateDatesEveryNDays(startDate: Date, endDate: Date, stepDays: number): Date[] {
                const dates: Date[] = [];
                let current = new Date(startDate);
                while (current <= endDate) {
                    dates.push(new Date(current));
                    current = new Date(current.getTime() + stepDays * 24 * 60 * 60 * 1000);
                }
                return dates;
            }

            // Get the plant
            const selectedPlant = await getSpecificPlant(plantId)
            if (!selectedPlant) {
                throw new Error(`No plant found : ${plantId}`);
            }

            // startDate = selectedPlant.lastWateredAt
            const startDate = new Date(selectedPlant.lastWateredAt);
            // endDate = startDate + 2 months
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 2);
            
            // Utilise la fréquence d'arrosage du modèle de la plante
            const stepDays = selectedPlant.model.wateringFrequency;
            if (stepDays <= 0) {
                throw new Error(`Invalid watering frequency ${stepDays} for plant ${plantId}`);
            }
            const dates = generateDatesEveryNDays(startDate, endDate, stepDays);
            const secondDate = dates.length > 1 ? dates[1] : null;
            if (!secondDate) {
                throw new Error(`Impossible de calculer la prochaine date d'arrosage pour la plante ${plantId}`);
            }

            const actualPlantId: number = parseInt(plantId, 10)
            const plant = await prisma.plant.update({
                where: { id: actualPlantId },
                data: {
                    nextWateringDate: secondDate
                },
                include: { model: true },
            });

            if (plant === null) {
                throw new Error(`Aucune plante trouvée ${plantId}`);
            }
            return plant;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la prochaine date d'arrosage pour la plante ${plantId}:`, error);
            throw new Error("Une erreur est survenue lors de la mise à jour de la prochaine date d'arrosage.");
        }
    }
