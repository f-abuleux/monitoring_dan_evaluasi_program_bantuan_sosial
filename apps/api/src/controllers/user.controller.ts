import { loginUserData } from "@/services/user.service";
import { Request, Response } from "express";

export class UserController{
    async loginUser(req : Request, res : Response){
        try {
            const loginUser = await loginUserData(req.body)

            if(!loginUser) throw "User unreginized"

            res.status(200).send({
                status : "Succes",
                msg : "Login Succes",
                loginUser
            })
            
        } catch (error) {
            res.status(400).send({
                status : "Failed",
                msg : error,
                res: 400
            })
        }
    }
}