import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Quiz App API działa!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
