import { User } from "../models/User.model.js"
import jwt from "jsonwebtoken"
import crypto from "crypto";
import {
    sendPasswordResetRequestEmail,
    sendPasswordResetSuccessEmail
} from "../mailtrap/email.js";
import { encryptEncryptionKey, decryptEncryptionKey } from "../lib/cryptography.js";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log("Error generating access and refresh token", error)
        return res.status(500).json({ message: "Error generating access and refresh token" })
    }
}


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" })

        const encryptionKey = crypto.randomBytes(32).toString("base64")

        const { encryptedEncryptionKey, iv, authTag } = encryptEncryptionKey(encryptionKey);

        const user = await User.create(
            {
                name,
                email,
                password,
                recoveryKey: {
                    encryptedEncryptionKey,
                    iv: iv.toString("base64"),
                    authTag
                }
            })
        const createdUser = await User.findById(user._id).select("-password -refreshToken -recoveryKey")

        return res.status(201).json({ message: "User Created Successfully", user: createdUser })
    } catch (error) {
        console.log("Error creating user", error)
        res.status(500).json({ message: "Error creating user" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email.trim() || !password.trim()) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User doesn't exists" })

        const isPasswordCorrect = await user.comparePassword(password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Password" })

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken -recoveryKey")

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User Logged In Successfully",
                user: loggedInUser,
                accessToken,
                refreshToken
            })

    } catch (error) {
        console.log("Error logging in user", error)
        return res.status(500).json({ message: error })
    }
}

const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1,
                }
            },
            {
                new: true
            }
        )
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                message: "User Logged Out Successfully"
            })
    } catch (error) {
        console.log("Error logging out user", error)
        return res.status(500).json({ message: "Error logging out user" })
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
        if (!incomingRefreshToken) throw new Error("Unauthorized Request")

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if (!user) throw new Error("Invalid Token")

        if (incomingRefreshToken !== user?.refreshToken) throw new Error("Refresh Token is expired or used")

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "Token refreshed Successfully",
            })

    } catch (error) {
        console.log("Error refreshing access token", error)
        return res.status(500).json({ message: "Error refreshing access token" })
    }
}

const changeCurrentPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user?._id)
        if (!oldPassword.trim() || !newPassword.trim()) {
            return res.status(400).json({message:"Please fill in all fields"})
        }

        if (oldPassword === newPassword) return res.status(400).json({ message: "New password cannot be the same as old password" })

        const isPasswordValid = await user.comparePassword(oldPassword)
        if (!isPasswordValid) return res.status(400).json({ message: "Old Password is Incorrect" })

        user.password = newPassword
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({ message: "Password Changed Successfully" })
    } catch (error) {
        console.log("Error changing current password", error)
        return res.status(500).json({ message: "Error changing current password" })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({ message: "User fetched Successfully", user: req.user })
    } catch (error) {
        console.log("Error getting current user", error)
        return res.status(500).json({ message: "Error getting current user" })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email.trim()) return res.status(400).json({ message: "Email is required" })

        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "User not found" })

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 3600000
        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save({ validateBeforeSave: false })

        await sendPasswordResetRequestEmail(user.email, `${process.env.Client_Url}/reset-password/${resetToken}`)

        return res.status(200).json({ message: "Reset Password Email sent successfully" })
    } catch (error) {
        console.log("Error while forgot-password setup process", error)
        return res.status(500).json({ message: "Error while forgot-password setup process" })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) return res.status(400).json({ message: "Invalid or expired reset token" })

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save({ validateBeforeSave: false });

        await sendPasswordResetSuccessEmail(user.email)
        return res.status(200).json({ message: "Password reset successfully" })
    } catch (error) {
        console.log("Error resetting password", error)
        return res.status(500).json({ message: "Error resetting password" })
    }
}

export {
    createUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    forgotPassword,
    resetPassword
}