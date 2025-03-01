import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
    account: {
        type: String,
        required: [true, "Account  or Credential linked to it is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    websiteUrl: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            "Please enter a valid URL",
        ],
    },
    iv: {
        type: String,
        required: true,
    },
    authTag: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

export const Credential = mongoose.model("Credential", credentialSchema)