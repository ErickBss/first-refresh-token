import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"


export function ensureAuthenticated (req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken){
        res.status(401).json({
            message: "Unauthorized"
        });
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, "passwordKey");
        return next();
    } catch (error) {
        res.status(401).json({
            message: "Token Invalid "
        });
    }
}