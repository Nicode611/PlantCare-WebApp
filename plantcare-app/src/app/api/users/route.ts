import { NextResponse } from 'next/server';
import * as UserController from './controllers/userController';

// Récupérer une plante spécifique (GET)
export async function GET() {
  try {
    // Call the controller
    const users = await UserController.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error(`Error while getting the users : `, error);
    return NextResponse.json(
      { error: "Error while getting the users." },
      { status: 500 }
    );
  }
}