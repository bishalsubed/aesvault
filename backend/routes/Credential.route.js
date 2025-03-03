import express from "express";
import { 
    createCredential, 
    deleteCredential, 
    getCredentials, 
    getCredentialById,
    updateCredential
} from "../controllers/Credential.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT)

router.post("/create", createCredential );

router.get("/getCredentials", getCredentials);

router.get("/getCredential/:credentialId", getCredentialById);

router.put("/updateCredentials/:credentialId", updateCredential);

router.delete("/deleteCredentials/:credentialId", deleteCredential );


export default router;