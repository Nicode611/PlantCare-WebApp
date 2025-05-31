import { NextResponse } from 'next/server';
import * as UserController from '../controllers/userController';

// Mettre à jour les informations d'un utilisateur (PATCH)
export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Extract params and body
    const awaitedParams = await Promise.resolve(params);
    const userId = awaitedParams.userId;
    const body = await request.json();

    // Call th controller to update infos
    const updatedUser = await UserController.updateInfosUser(userId, body);

    console.log(updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(`Error while updating plant ${params.userId}:`, error);
    return NextResponse.json(
      { error: "Error while updating plant." },
      { status: 500 }
    );
  }
}