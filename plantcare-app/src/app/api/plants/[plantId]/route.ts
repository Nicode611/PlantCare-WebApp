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

// Supprimer une plante (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: { plantId: string } }
) {
  try {
    // Attendre la résolution des params depuis la nouvelle version de next
    const awaitedParams = await Promise.resolve(params);
    const plantId = awaitedParams.plantId;

    // Call the controller
    await PlantController.deletePlant(plantId);
    return NextResponse.json({ message: "Plant deleted successfully." });
  } catch (error) {
    const awaitedParams = await Promise.resolve(params);
    console.error(`Error while deleting the plant ${awaitedParams.plantId}:`, error);
    return NextResponse.json(
      { error: "Error while deleting the plant." },
      { status: 500 }
    );
  }
}

// Mettre à jour une plante : utilise ?action=updateNextWateringDate ou body pour waterLvl
export async function PATCH(
  request: Request,
  { params }: { params: { plantId: string } }
) {
  try {
    // Extract params and body
    const awaitedParams = await Promise.resolve(params);
    const plantId = awaitedParams.plantId;
    const body = await request.json();
    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    let updatedPlant;
    // Decide which controller method to call based on action in the url or request body
    if (action === 'updateNextWateringDate') {
      updatedPlant = await PlantController.updateNextWateringDate(plantId);
    } else if ('actualWaterLvl' in body || 'lastWateredAt' in body) {
      updatedPlant = await PlantController.updateWaterLvl(plantId, body);
    } else {
      // Fallback: update other plant info fields
      updatedPlant = await PlantController.updatePlantInfos(plantId, body);
    }

    return NextResponse.json(updatedPlant);
  } catch (error) {
    console.error(`Error while updating plant ${params.plantId}:`, error);
    return NextResponse.json(
      { error: "Error while updating plant." },
      { status: 500 }
    );
  }
}