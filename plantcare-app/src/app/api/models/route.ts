import { NextResponse } from 'next/server';
import * as ModelController from "./controllers/modelController";

// Récupérer une plante spécifique (GET)
export async function GET() {
try {

    // Call the controller
    const models = await ModelController.getModels();
    return NextResponse.json(models);
    
} catch (error) {
    console.error(`Error when recovering models :`, error);
    return NextResponse.json(
    { error: "Error when recovering models" },
    { status: 500 }
    );
}
}