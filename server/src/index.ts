import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import quizRoutes from "./routes/quiz.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/quiz", quizRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
