import { sign } from "jsonwebtoken";

export class GenerateTokenProvider {
    async execute(userId: string){
        const token = sign({}, "passwordKey", {
            subject: userId,
            expiresIn: "20s"
        });

        return token;
    }
}