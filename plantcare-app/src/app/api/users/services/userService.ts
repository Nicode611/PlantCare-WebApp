import prisma from "@/app/api/prisma/prismaClient";
import { CreateUserInput, UserInfos } from "../types/user";

class UserService {
  
    static async createUser({username, email, password}: CreateUserInput) {

        const existingEmail = await prisma.user.findUnique({
            where: { email },
        })

        if (existingEmail) {
            throw new Error("Someone already used this email adress.")
        }

        const existingUsername = await prisma.user.findUnique({
            where: { username },
        })

        if (existingUsername) {
            throw new Error("Someone already used this username.")
        }
        

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        })
        return user;
    }

    static async getUsers(): Promise<UserInfos[]> {
        const users = await prisma.user.findMany()
        return users;
    }

}

export default UserService;