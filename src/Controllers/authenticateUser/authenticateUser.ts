import {compare} from "bcryptjs";
import { sign } from "jsonwebtoken"

import { client } from "../../prisma/client";

import { generateRefreshToken } from "../../provider/generateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

export class AuthenticateUser {
   async execute({username, password}) {
    
    //Verification if the user exists

    const userAuthentication = await client.user.findFirst({
        where:{
            username,
        }
    });
        if(!userAuthentication){
            throw new Error("User or password incorrect");
        }

        // password verification

        const passwordMatch = await compare(password, userAuthentication.password);

        if(!passwordMatch){
            throw new Error("User or password incorrect");
        }

        //generate the user token

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAuthentication.id);

        await client.refreshToken.deleteMany({
            where:{
                userId:userAuthentication.id
            }
        })

        const contains_generateRefreshToken = new generateRefreshToken();
        const refreshToken = await contains_generateRefreshToken.execute(userAuthentication.id);
           
        return{token, refreshToken};
   }    
   
}