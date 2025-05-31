import prisma from "../../prisma/prismaClient";
import type { User } from "@prisma/client";


// Get specific User
export async function getAllUsers(): Promise<User[]> {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
      console.error("Erreur lors de la récupération de users dans le service:", error);
      throw error;
    }
}

// Modify infos of user
export async function updateInfosUser(userId: string, data: Partial<User>): Promise<User | null> {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
        });
        return updatedUser;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'utilisateur ${userId} dans le service:`, error);
        throw error;
    }
}