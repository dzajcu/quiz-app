import api from "./api";
import { IconName } from "@/components/ui/icon-picker";
import { Question } from "@/types/quiz";

interface CreateQuizRequest {
    title: string;
    questions: Array<{
        question: string;
        answers: Array<{
            text: string;
            isCorrect: boolean;
        }>;
    }>;
    isPublic: boolean;
    icon: IconName;
}

export const quizService = {
    createQuiz: async (
        title: string,
        questions: Question[],
        isPublic: boolean,
        icon: IconName
    ) => {
        const formattedQuestions = questions.map((q) => ({
            question: q.question,
            answers: q.answers.map((text: string, index: number) => ({
                text,
                isCorrect:
                    index ===
                    (q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : 0),
            })),
        }));

        const payload: CreateQuizRequest = {
            title,
            questions: formattedQuestions,
            isPublic,
            icon: icon,
        };

        try {
            const response = await api.post("/quiz", payload);
            return response.data;
        } catch (error) {
            console.error("Error creating quiz:", error);
            throw error;
        }
    },
};
