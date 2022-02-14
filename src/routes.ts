import { Router } from "express";

import { createUser } from "./Controllers/createUserController";
import { AuthenticateUserController } from "./Controllers/authenticateUser/authenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { RefreshTokenController } from "./Controllers/RefreshToken/RefreshTokenController";

const router = Router();

const newUser = new createUser();
const userAuthentication = new AuthenticateUserController();
const refreshToken= new RefreshTokenController();

router.post("/user", newUser.handle);
router.post("/login", userAuthentication.handle);
router.post("/refreshToken", refreshToken.handle);

router.get("/infos",ensureAuthenticated, (req,res) => {
    res.json({
        id: 1, name:"nodeJS"
    });
});

export{router};

