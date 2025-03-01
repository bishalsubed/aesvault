import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json())

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    credentials:true
}))


app.use(express.json({limit:"5mb"}));
app.use(cookieParser())

import userRoutes from "./routes/User.route.js";
import credentialRoutes from "./routes/Credential.route.js";

app.use("/api/users", userRoutes )
app.use("/api/credentials", credentialRoutes)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    dbConnect();
})