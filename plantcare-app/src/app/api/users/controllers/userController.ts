import * as UserService from "../services/userService";

    export async function getAllUsers() {
        return await UserService.getAllUsers()
    }