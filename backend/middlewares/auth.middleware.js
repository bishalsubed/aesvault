import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"
export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        if (!token) return res.status(401).json({ message: "Unauthorized request" })

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -recoverykey")
        if (!user) throw new Error("Invalid Access Token")

        req.user = user;
        next();
    } catch (error) {
        console.log("Error verifying JWT", error)
        return res.status(500).json({ message: "Error verifying JWT" })
    }
}