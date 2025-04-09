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

    // Call the controller
    const plant = await PlantController.getSpecificPlant(plantId);
    return NextResponse.json(plant);
  } catch (error) {
    const awaitedParams = await Promise.resolve(params);
    console.error(`Error while fetching the plant ${awaitedParams.plantId}:`, error);
    return NextResponse.json(
      { error: "Error while fetching the plant." },
      { status: 500 }
    );
  }
}


// Mettre à jour le niveau d'eau d'une plante (PATCH)
export async function PATCH(
  request: Request,
  { params }: { params: { plantId: string } }
) {
  try {
    // Get infos 
    const awaitedParams = await Promise.resolve(params);
    const plantId = awaitedParams.plantId;
    const body = await request.json();

    // Call the controller
    const updatedPlant = await PlantController.updateWaterLvl(plantId, body);
    return NextResponse.json(updatedPlant);

  } catch (error) {
    console.error(`Error while updating water lvl. ${params.plantId}:`, error);
    return NextResponse.json(
      { error: "Error while updating water lvl." },
      { status: 500 }
    );
  }
}