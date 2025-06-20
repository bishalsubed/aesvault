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
        const { account, password, websiteUrl } = req.body;

        if (!account.trim() || !password.trim() || !websiteUrl.trim()) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const encryptionKey = decryptEncryptionKey(user.recoveryKey.encryptedEncryptionKey, user.recoveryKey.iv, user.recoveryKey.authTag)

        const { cipherText, authTag, iv } = encryptSymmetric(encryptionKey, password)

        const credential = await Credential.create({
            account,
            password: cipherText,
            websiteUrl,
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
                ...credential.toJSON(), password: decryptedPassword
            }
        })
        if (!decryptedCredentials) return res.status(500).json({ message: "Error getting credentials" });
        return res.status(200).json({ credentials: decryptedCredentials })
    } catch (error) {
        console.log("Error getting credentials", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getCredentialById = async (req, res) => {
    try {
        const { credentialId } = req.params;
        if (!credentialId) throw new Error("Credential ID is required");

        const encryptedCredential = await Credential.findById(credentialId);
        if (!encryptedCredential) throw new Error("Credential not found")

        const encryptionKey = decryptEncryptionKey(req.user.recoveryKey.encryptedEncryptionKey, req.user.recoveryKey.iv, req.user.recoveryKey.authTag)
        const decryptedPassword = decryptSymmetric(encryptionKey, encryptedCredential.password, encryptedCredential.iv, encryptedCredential.authTag)

        const { iv, authTag, ...rest } = encryptedCredential.toJSON();
        const decryptedCredential = { ...rest, password: decryptedPassword };

        return res.status(200).json({ message: "Credential Obtained Sucessfully", credential: decryptedCredential })
    } catch (error) {
        console.log("Error getting credential by ID", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateCredential = async (req, res) => {
    try {
        const { credentialId } = req.params;
        const { account, password, websiteUrl } = req.body;

        if (!credentialId) throw new Error("Credential ID is required");

        const existingCredential = await Credential.findById(credentialId)

        if (account) {
            if (existingCredential.account == account) {
            }
            else {
                try {
                    await Credential.findByIdAndUpdate(credentialId, {
                        account
                    }, { new: true })
                } catch (error) {
                    console.log("Error updating account/email", error)
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
        }

        if (password) {
            const encryptionKey = decryptEncryptionKey(req.user.recoveryKey.encryptedEncryptionKey, req.user.recoveryKey.iv, req.user.recoveryKey.authTag)
            const decryptedPassword = decryptSymmetric(encryptionKey, existingCredential.password, existingCredential.iv, existingCredential.authTag)
            if (decryptedPassword == password) {
            }
            else {
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
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
        }

        if (websiteUrl) {
            if (existingCredential.websiteUrl == websiteUrl) {
            }
            else {
                try {
                    await Credential.findByIdAndUpdate(credentialId, {
                        websiteUrl
                    }, { new: true })
                } catch (error) {
                    console.log("Error updating website link", error)
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
        }
        return res.status(200).json({ message: "Credential updated successfully" })
    } catch (error) {
        console.log("Error updating password", error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteCredential = async (req, res) => {
    try {
        const userId = req.user._id
        const { credentialId } = req.params;
        if (!credentialId) throw new Error("Credential ID is required");

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const credential = await Credential.findById(credentialId)
        if (!credential) throw new Error("Credential does not exist")

        await Credential.findByIdAndDelete(credentialId)
        user.credentials = user.credentials.filter(cred => cred.toString() !== credentialId.toString())
        return res.status(200).json({ message: "Credential deleted successfully" })

    } catch (error) {
        console.log("Error deleting credential", error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getCredentialByWebsiteUrl = async (req, res) => {
    try {
        const {search} = req.query;
        const encryptedPotentialCredentials = await Credential.find({
            websiteUrl:{$regex: search, $options:"i" },
            owner:req.user._id,
        })
        if (!encryptedPotentialCredentials) throw new Error("No credentials found")
        
        return res.status(200).json({ credentials: encryptedPotentialCredentials })
    } catch (error) {
        console.log("Error getting credential by website URL", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
    createCredential,
    getCredentials,
    getCredentialById,
    updateCredential,
    deleteCredential,
    getCredentialByWebsiteUrl
}