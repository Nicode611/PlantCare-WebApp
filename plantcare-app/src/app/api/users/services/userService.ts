import prisma from "../../prisma/prismaClient";
import { User } from "../types/user";


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