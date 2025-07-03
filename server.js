import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./DB/connectDB.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5000", "https://pos-app-mern-prod.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//  Routes
app.get('/', (req, res) => {
    res.json("Backend Running");
});
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(
        `Node Server Running In ${process.env.NODE_ENV} ModeOn Port ${process.env.PORT}`
    );
});
