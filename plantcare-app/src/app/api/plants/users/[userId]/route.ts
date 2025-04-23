import { NextResponse } from 'next/server';
import * as PlantController from '../../controller/plantController';

// Récupérer une plante spécifique (GET)
export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
try {
    // Attendre la résolution des params depuis la nouvelle version de next
    const awaitedParams = await Promise.resolve(params);
    const userId = awaitedParams.userId;

    // Call the controller
    const plants = await PlantController.getPlantsFromUser(userId);
    return NextResponse.json(plants);
    
} catch (error) {
    console.error(`Error when recovering plants :`, error);
    return NextResponse.json(
    { error: "Error when recovering plants" },
    { status: 500 }
    );
}
}

// Créer une plante
export async function POST(
    request: Request,
    { params }: { params: { userId: string } }
) {
try {
    // Get the infos
    const awaitedParams = await Promise.resolve(params);
    const userId = awaitedParams.userId;
    const body = await request.json(); 

    // Call the controller
    let plant = await PlantController.createPlant(userId, body);
    plant = await PlantController.updateNextWateringDate(plant.id.toString());

    return NextResponse.json(plant);

} catch (error) {
    console.error(`Error while creating the plant :`, error);
    return NextResponse.json(
    { error: "Error while creating the plant." },
    { status: 500 }
    );
}
}