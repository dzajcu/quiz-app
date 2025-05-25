import { Router } from "express";
import {
    getAllPublicQuizzes,
    getUserQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
} from "../controllers/quiz.controller";
import { auth } from "../middlewares/auth.middleware";
import { getMe } from "../controllers/user.controller";

const router = Router();

router.get("/public", getAllPublicQuizzes);

router.get("/my-quizzes", auth, getMe, getUserQuizzes);
router.get("/user/:userId", auth, getUserQuizzes);

router.get("/:id", auth, getQuizById);

router.post("/", auth, createQuiz);
router.patch("/:id", auth, updateQuiz);
router.delete("/:id", auth, deleteQuiz);

export default router;
