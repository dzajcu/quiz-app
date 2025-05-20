import { Request, Response } from "express";
import Quiz from "../models/quiz.model";
import mongoose from "mongoose";

export const getAllPublicQuizzes = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const quizzes = await Quiz.find({ isPublic: true })
            .populate("author", "username")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Quiz.countDocuments({ isPublic: true });

        res.status(200).json({
            quizzes,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
        });
    } catch (error) {
        console.error("Error fetching public quizzes:", error);
        res.status(500).json({
            message: "An error occurred while fetching quizzes",
        });
    }
};

export const getUserQuizzes = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId || (req as any).userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const quizzes = await Quiz.find({ author: userId })
            .populate("author", "username")
            .sort({ createdAt: -1 });

        res.status(200).json({ quizzes });
    } catch (error) {
        console.error("Error fetching user quizzes:", error);
        res.status(500).json({
            message: "An error occurred while fetching user quizzes",
        });
    }
};

export const getQuizById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid quiz ID" });
        }

        const quiz = await Quiz.findById(id).populate("author", "username");

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        if (!quiz.isPublic && quiz.author.toString() !== (req as any).userId) {
            return res
                .status(403)
                .json({ message: "You don't have permission to access this quiz" });
        }

        res.status(200).json({ quiz });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({
            message: "An error occurred while fetching the quiz",
        });
    }
};

export const createQuiz = async (req: Request, res: Response) => {
    try {
        const { title, questions, isPublic = true, icon } = req.body;
        console.log("Creating quiz with data:", req.body);
        if (
            !title ||
            !questions ||
            !Array.isArray(questions) ||
            questions.length === 0 ||
            !icon
        ) {
            return res.status(400).json({
                message: "Title, icon, and at least one question are required",
            });
        }

        for (const [index, question] of questions.entries()) {
            if (
                !question.question ||
                !question.answers ||
                !Array.isArray(question.answers)
            ) {
                return res.status(400).json({
                    message: `Invalid question format in question ${index + 1}`,
                });
            }
            const validAnswers = question.answers.filter(
                (a: { text: string }) => a.text && a.text.trim().length > 0
            );
            if (!(validAnswers.length >= 2 && validAnswers.length <= 4)) {
                return res.status(400).json({
                    message: `Question number ${
                        index + 1
                    } must have between 2 and 4 answers`,
                });
            }

            const correctAnswers = question.answers.filter((a: any) => a.isCorrect);
            const isCorrectAnswerValid =
                question.answers
                    .find((a: { text: string; isCorrect: boolean }) => a.isCorrect)
                    ?.text?.trim().length > 0;

            if (correctAnswers.length !== 1 || !isCorrectAnswerValid) {
                return res.status(400).json({
                    message: `Question at position ${
                        index + 1
                    } must have exactly one correct answer`,
                });
            }
        }

        const processedQuestions = questions.map((q, index) => ({
            ...q,
            id: q.id || index + 1,
        }));

        const newQuiz = new Quiz({
            title,
            author: (req as any).userId,
            isPublic,
            questions: processedQuestions,
            icon,
        });

        await newQuiz.save();

        res.status(201).json({
            message: "Quiz created successfully",
            quiz: newQuiz,
        });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({
            message: "An error occurred while creating the quiz",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

export const updateQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, questions, isPublic } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid quiz ID" });
        }

        const quiz = await Quiz.findById(id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        if (quiz.author.toString() !== (req as any).userId) {
            return res
                .status(403)
                .json({ message: "You don't have permission to update this quiz" });
        }

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            {
                title,
                questions,
                isPublic: isPublic !== undefined ? isPublic : quiz.isPublic,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Quiz updated successfully",
            quiz: updatedQuiz,
        });
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({
            message: "An error occurred while updating the quiz",
        });
    }
};

export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid quiz ID" });
        }

        const quiz = await Quiz.findById(id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        if (quiz.author.toString() !== (req as any).userId) {
            return res
                .status(403)
                .json({ message: "You don't have permission to delete this quiz" });
        }

        await Quiz.findByIdAndDelete(id);

        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({
            message: "An error occurred while deleting the quiz",
        });
    }
};
