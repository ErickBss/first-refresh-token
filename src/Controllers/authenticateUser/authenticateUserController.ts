import { Request, Response } from "express";
import { AuthenticateUser } from "./authenticateUser";


export class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const {username, password} = req.body;
        const authenticateUser = new AuthenticateUser();

        const token = await authenticateUser.execute(
           { username,
            password}
        );
    res.json(token);
    }
}