import express from "express";
import { 
    createUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    forgotPassword, 
    resetPassword 
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.post("/logout",verifyJWT , logoutUser);

router.post("/refresh-token", refreshAccessToken);

router.post("/change-password",verifyJWT , changeCurrentPassword);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:resetToken", resetPassword);

router.get("/profile", verifyJWT,  getCurrentUser);



export default router;