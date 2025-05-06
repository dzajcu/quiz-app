import { Router } from "express";
import {
    register,
    login,
    getProfile,
    getAllUsers,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);
router.get("/", getAllUsers);

export default router;
