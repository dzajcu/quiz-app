import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    userId: string;
    username: string;
    role: string;
    iat: number;
    exp: number;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication token missing" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "fallback_secret"
        ) as DecodedToken;

        (req as any).userId = decoded.userId;
        (req as any).username = decoded.username;
        (req as any).userRole = decoded.role;

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid authentication token" });
    }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).userRole !== "admin") {
        return res
            .status(403)
            .json({ message: "Access denied. Admin privileges required." });
    }
    next();
};
