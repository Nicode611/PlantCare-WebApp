import prisma from "../prisma/prismaClient";

/**
 * Calcule le niveau d'eau actuel d'une plante en fonction du temps écoulé.
 * À la date `lastWateredAt`, on part du niveau `actualWaterLvl` (en %).
 * À la date `nextWateringDate` (et au-delà), on retombe à 25 %. */
export async function adjustWaterLevel(){

    const plants = await prisma.plant.findMany({
        select: {
          id: true,
          userId: true,
          modelId: true,
          actualWaterLvl: true,
          lastWateredAt: true,
          nextWateringDate: true,
        },
      });

    if (plants.length === 0) {
        throw new Error("Aucune plante trouvée");
    } else if (plants.length > 0) {
        for (const plant of plants) {
            const { id: actualPlantId, actualWaterLvl, lastWateredAt, nextWateringDate } = plant;

            if (lastWateredAt == null || nextWateringDate == null || actualWaterLvl == null) {
                throw new Error(`lastWateredAt, nextWateringDate or actualWaterLvl is null for plant ${actualPlantId}`);
            }

            const now = Date.now();
            const start = lastWateredAt.getTime();
            const end = nextWateringDate.getTime();
            
            // clamp ratio between 0 and 1
            const ratio = Math.min(Math.max((now - start) / (end - start), 0), 1);

            // interpolate and round
            const newLevel = Math.round((1 - ratio) * actualWaterLvl + ratio * 25);

            await prisma.plant.update({
                where: { id: actualPlantId },
                data: { actualWaterLvl: newLevel },
            });
        }
    }
  }