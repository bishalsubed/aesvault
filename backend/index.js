import express from "express";
import dbConnect from "./lib/dbConnect.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";


import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
    origin: `${process.env.Client_Url}`,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
}))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser())

app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

import userRoutes from "./routes/User.route.js";
import credentialRoutes from "./routes/Credential.route.js";

app.use("/api/users", userRoutes)
app.use("/api/credentials", credentialRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnect();
})