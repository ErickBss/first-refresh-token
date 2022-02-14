import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.use(
    (error: Error, req: Request, res:Response, next: NextFunction ) => {
        res.status(401).json({

            status: "Error",
            message: error.message
        })
    }
)

app.listen(3000 , () =>{
    console.log("Server Started")
})