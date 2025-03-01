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

router.post("/credentials", createCredential );

router.get("/credentials", getCredentials);

router.get("/credentials/:id", getCredentialById);

router.put("/credentials/:credentialId", updateCredential);

router.delete("/credentials/:credentialId", deleteCredential );


export default router;