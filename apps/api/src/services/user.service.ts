import prisma from "@/prisma";
import { LoginUser } from "@/types/user.type";

export const loginUserData = async ({ user_email, user_password }: LoginUser) => {
    try {
        const userData = await prisma.user.findFirst({
            where: {
                user_email
            }
        })

        if (!userData) throw "User not found"
        if (user_password != userData.user_password) throw "Password incorrect"

        return userData
    } catch (error) {
        throw error
    }
}