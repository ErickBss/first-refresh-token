import {client} from "../prisma/client";
import { Request, Response } from "express";

import {hash } from "bcryptjs"

export class createUser {

    async handle(req:Request, res: Response){
        const {username, password} = req.body;

        //Verification if the username is unique
        const usernameVerification = await client.user.findFirst({
            where:{
                username
            }
        });
        if(usernameVerification ){
            throw new Error("User already exists");
        }

        // Register

        const passwordHash = await hash(password, 8);

        const register = await client.user.create({
            data:{
                username,
                password: passwordHash
            }
        });
        return res.json(register)
    }
}