import { Credential } from "../models/Credential.model.js";
import { 
    encryptSymmetric, 
    decryptSymmetric, 
    decryptEncryptionKey 
} from "../lib/cryptography.js";
import { User } from "../models/User.model.js";

const createCredential = async (req, res) => {
    try {
        const userId = req.user._id
        const { account, password, websiteLink } = req.body;

        if (!account.trim() || !password.trim() || !websiteLink.trim()) {
            throw new Error("Please fill in all fields");
        }
        const user = await User.findById(userId);
        if (!user) throw new Error("User does not exist");

        const encryptionKey = decryptEncryptionKey(user.recoveryKey.encryptedEncryptionKey, user.recoveryKey.iv, user.recoveryKey.authTag)

        const { cipherText, authTag, iv } = encryptSymmetric(encryptionKey, password)

        const credential = await Credential.create({
            account,
            password: cipherText,
            websiteLink,
            iv,
            authTag,
            owner: userId
        })
        user.credentials.push(credential._id);
        await user.save();
        const createdCredential = await Credential.findById(credential._id).select("-password -iv -authTag")
        return res.status(201).json({ message: "Credential created successfully", credential: createdCredential });
    } catch (error) {
        console.log("Error in creating credential", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getCredentials = async (req, res) => {
    try {
        const encryptedCredentials = await Credential.find({ _id: { $in: req.user.credentials } });
        if (!encryptedCredentials) throw new Error("No credentials found")
        const decryptedCredentials = encryptedCredentials.map(credential => {
            const encryptionKey = decryptEncryptionKey(req.user.recoveryKey.encryptedEncryptionKey, req.user.recoveryKey.iv, req.user.recoveryKey.authTag)
            const decryptedPassword = decryptSymmetric(encryptionKey, credential.password, credential.iv, credential.authTag)
            return {
                ...encryptedCredentials.toJSON(), password: decryptedPassword
            }
        })
        if (!decryptedCredentials) throw new Error("Error decrypting credentials")
        return res.status(200).json({ credentials: decryptedCredentials })
    } catch (error) {
        console.log("Error getting credentials", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getCredentialById = async(req,res) => {
    try {
        const { credentialId } = req.params;
        if(!credentialId) throw new Error("Credential ID is required");

        const encryptedCredential = await Credential.findById(credentialId);
        if(!encryptedCredential) throw new Error("Credential not found")

        const encryptionKey = decryptEncryptionKey(req.user.recoveryKey.encryptedEncryptionKey, req.user.recoveryKey.iv, req.user.recoveryKey.authTag)
        const decryptedPassword = decryptSymmetric(encryptionKey, encryptedCredential.password, encryptedCredential.iv, encryptedCredential.authTag)
        const decryptedCredential = {
            ...encryptedCredential.toJSON(),password:decryptedPassword
        }
        return res.status(200).json({message:"Credential Obtained Sucessfully",credential:decryptedCredential})
    } catch (error) {
        console.log("Error getting credential by ID", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateCredential = async (req, res) => {
    try {
        const { credentialId } = req.params;
        const { account, password, websiteLink } = req.body;
        if (!credentialId) throw new Error("Credential ID is required");

        if (account) {
            try {
                await Credential.findByIdAndUpdate(credentialId, {
                    account
                }, { new: true })
            } catch (error) {
                console.log("Error updating account/email", error)
                res.status(500).json({ message: "Internal Server Error" });
            }
        }

        if (password) {
            try {
                const encryptionKey = decryptEncryptionKey(req.user.recoveryKey.encryptedEncryptionKey, req.user.recoveryKey.iv, req.user.recoveryKey.authTag)
                const { cipherText, iv, authTag } = encryptSymmetric(encryptionKey, password)

                await Credential.findByIdAndUpdate(credentialId, {
                    password: cipherText,
                    iv,
                    authTag
                }, { new: true })
            } catch (error) {
                console.log("Error updating password", error)
                res.status(500).json({ message: "Internal Server Error" });
            }
        }

        if (websiteLink) {
            try {
                await Credential.findByIdAndUpdate(credentialId, {
                    websiteLink
                }, { new: true })
            } catch (error) {
                console.log("Error updating website link", error)
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
        return res.status(200).json({ message: "Credential updated successfully" })
    } catch (error) {
        console.log("Error updating password", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteCredential = async (req, res) => {
    try {
        const { credentialId } = req.params;
        if (!credentialId) throw new Error("Credential ID is required");

        const credential = await Credential.findById(credentialId)
        if (!credential) throw new Error("Credential does not exist")

        await Credential.findByIdAndDelete(credentialId)
        return res.status(200).json({ message: "Credential deleted successfully" })

    } catch (error) {
        console.log("Error deleting credential", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
    createCredential,
    getCredentials,
    getCredentialById,
    updateCredential,
    deleteCredential
}