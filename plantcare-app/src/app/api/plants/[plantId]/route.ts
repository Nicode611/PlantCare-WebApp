import { NextResponse } from 'next/server';
import * as PlantController from '../controller/plantController';

// Récupérer une plante spécifique (GET)
export async function GET(
  request: Request,
  { params }: { params: { plantId: string } }
) {
  try {
    // Attendre la résolution des params depuis la nouvelle version de next
    const awaitedParams = await Promise.resolve(params);
    const plantId = awaitedParams.plantId;

    const plant = await PlantController.getSpecificPlant(plantId);
    return NextResponse.json(plant);
  } catch (error) {
    const awaitedParams = await Promise.resolve(params);
    console.error(`Erreur lors de la récupération de la plante ${awaitedParams.plantId}:`, error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération de la plante." },
      { status: 500 }
    );
  }
}

