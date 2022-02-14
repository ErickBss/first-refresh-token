import dayjs from "dayjs";

import { client } from "../../prisma/client";
import { generateRefreshToken } from "../../provider/generateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";


export class RefreshToken {
    async execute(refresh_Token: string){
        const refreshToken = await client.refreshToken.findFirst({
            where:{
                id: refresh_Token
            }
        });
        if(!refreshToken){
            throw new Error ("Refresh Token invalid")
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
        
                const generateTokenProvider = new GenerateTokenProvider();
                const token = await generateTokenProvider.execute(refreshToken.id);

        if(refreshTokenExpired){

            await client.refreshToken.deleteMany({
                where:{
                    userId: refreshToken.userId
                }
            })

            const generateRefreshTokenProvider = new generateRefreshToken();
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);
         
            return {token,RefreshToken: newRefreshToken};
        }

        return {token};
    }
}