import prisma from "../prisma/prismaClient";

/**
 * Calcule le niveau d'eau actuel d'une plante en fonction du temps écoulé.
 * À la date `lastWateredAt`, on part du niveau `actualWaterLvl` (en %).
 * À la date `nextWateringDate` (et au-delà), on retombe à 25 %. */
export async function adjustWaterLevel() {
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
        console.log("Aucune plante trouvée.");
        return;
    }

    const now = Date.now();

    for (const plant of plants) {
        const { id: actualPlantId, actualWaterLvl, lastWateredAt, nextWateringDate } = plant;

        if (!lastWateredAt || !nextWateringDate || actualWaterLvl === null) {
            // Skip this plant if any required field is missing
            continue;
        }

        const start = new Date(lastWateredAt).getTime();
        const end = new Date(nextWateringDate).getTime();

        if (now < start) {
            // Si la date actuelle est avant `lastWateredAt`, ne rien faire
            continue;
        }

        const duration = end - start;
        const elapsed = now - start;

        let newLevel: number;

        if (elapsed <= duration) {
            // Phase 1: Interpolation entre 100% et 25% jusqu'à `nextWateringDate`
            const ratio = elapsed / duration;
            newLevel = Math.round((1 - ratio) * 100 + ratio * 25);
        } else {
            // Phase 2: Après `nextWateringDate`, interpolation entre 25% et 0%
            const postDuration = now - end;
            const secondRatio = Math.min(postDuration / duration, 1);
            newLevel = Math.round((1 - secondRatio) * 25);
        }

        // Mettre à jour le niveau d'eau uniquement si nécessaire
        if (newLevel !== actualWaterLvl) {
            await prisma.plant.update({
                where: { id: actualPlantId },
                data: { actualWaterLvl: newLevel },
            });
        }
    }

    console.log("Water levels adjusted successfully.");
}

export async function createTaskIfNeeded() {

    const plantsNeedingAction = await prisma.plant.findMany({
        where: {
          nextWateringDate: {
            lte: new Date(Date.now() + 24 * 60 * 60 * 1000), // within the next 24 hours
          },
        },
        select: {
          id: true,
          userId: true,
          modelId: true,
          actualWaterLvl: true,
          lastWateredAt: true,
          nextWateringDate: true,
        },
      });

    if (plantsNeedingAction.length === 0) {
        return; // No plants needing action
    } else if (plantsNeedingAction.length > 0) {
        for (const plant of plantsNeedingAction) {
            const { id: actualPlantId, userId, modelId, nextWateringDate } = plant;

            if (userId == null || modelId == null) {
                // Skip this plant if any required field is missing
                continue;
            }

            if (nextWateringDate != null) {
                // Skip creating a duplicate task if one already exists for this plant at the same date
                const existingTask = await prisma.task.findFirst({
                    where: {
                        plantId: actualPlantId,
                        action: "water",
                        dateOfAction: nextWateringDate
                    },
                });
                if (existingTask) {
                    continue;
                }
                await prisma.task.create({
                    data: {
                        userId,
                        plantId: actualPlantId,
                        action: "water",
                        dateOfAction: new Date(nextWateringDate),
                        severityLvl: "L",
                        isDone: false,
                    },
                });
            }
        }
        console.log("Tasks created successfully.");
    }
}

// Update severity level of tasks
export async function updateTaskSeverityLevel() {
  // Récupère toutes les tâches non faites avec la plante jointe
  const tasks = await prisma.task.findMany({
    where: { isDone: false },
    include: { plant: { select: { actualWaterLvl: true } } },
  });

  for (const task of tasks) {
    const { id: taskId, plant: { actualWaterLvl } } = task;

    // Détermine le niveau de sévérité en fonction du pourcentage d'eau
    let newSeverity: string;
    if (actualWaterLvl <= 33) {
      newSeverity = "H";
    } else if (actualWaterLvl > 33 && actualWaterLvl < 66) {
      newSeverity = "M";
    } else {
      newSeverity = "L";
    }

    // Met seulement à jour si nécessaire
    if (task.severityLvl !== newSeverity) {
      await prisma.task.update({
        where: { id: taskId },
        data: { severityLvl: newSeverity },
      });
    }
  }

  console.log("Task severities updated.");
}


// deleteTasksIfNeeded
/* export async function deleteTasksIfNeeded() {
    const tasks = await prisma.task.findMany({
        where: {
          dateOfAction: {
            lte: new Date(Date.now() - 24 * 60 * 60 * 1000), // older than 24 hours
          },
        },
        select: {
          id: true,
          userId: true,
          plantId: true,
          action: true,
          dateOfAction: true,
          severityLvl: true,
          isDone: true,
        },
      });

    if (tasks.length === 0) {
        throw new Error("Aucune tâche trouvée");
    } else if (tasks.length > 0) {
        for (const task of tasks) {
            const { id: actualTaskId, userId, plantId, action, dateOfAction, severityLvl, isDone } = task;

            if (userId == null || plantId == null || action == null || dateOfAction == null || severityLvl == null || isDone == null) {
                // Skip this task if any required field is missing
                continue;
            }

            await prisma.task.delete({
                where: { id: actualTaskId },
            });
        }
        console.log("Tasks deleted successfully.");
    }
} */