import { User } from "@prisma/client";
import * as UserService from "../services/userService";

  export async function getAllUsers() {
      return await UserService.getAllUsers()
  }

  export async function updateInfosUser(userId: string, data: Partial<User>) {
      return await UserService.updateInfosUser(userId, data);
  }