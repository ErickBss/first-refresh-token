import { Request, Response } from "express";
import { RefreshToken } from "./RefreshTokens";


export class RefreshTokenController {
    async handle(req: Request, res: Response){
        const {refresh_Token} = req.body;

        const refreshToken = new RefreshToken();

        const token = await refreshToken.execute(refresh_Token);

        res.json({"Token":token});
    }
}