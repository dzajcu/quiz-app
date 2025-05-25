import api from "./api";
import { IconName } from "@/components/ui/icon-picker";
import { Question, Quiz } from "@/types/quiz";

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
        const formattedQuestions = questions.map((q) => {
            // Filter out empty answers
            const filteredAnswers = q.answers
                .map((text: string, index: number) => ({
                    text: text.trim(),
                    originalIndex: index,
                }))
                .filter((answer) => answer.text !== "");

            // Adjust correctAnswerIndex to match filtered answers
            const originalCorrectIndex =
                q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : 0;
            const correctAnswerText = q.answers[originalCorrectIndex]?.trim();
            const newCorrectIndex = filteredAnswers.findIndex(
                (answer) => answer.text === correctAnswerText
            );

            return {
                question: q.question,
                answers: filteredAnswers.map((answer, index) => ({
                    text: answer.text,
                    isCorrect: index === newCorrectIndex,
                })),
            };
        });

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
    getAllPublicQuizzes: async (): Promise<Quiz[]> => {
        const { data } = await api.get<Quiz[]>("/quiz/public");
        return data;
    },
    getUserQuizzes: async (userId: string): Promise<Quiz[]> => {
        const { data } = await api.get<Quiz[]>(`/quiz/user/${userId}`);
        return data;
    },
    getMyQuizzes: async (): Promise<Quiz[]> => {
        const { data } = await api.get<Quiz[]>("/quiz/my-quizzes");
        return data;
    },
    getQuizById: async (id: string): Promise<Quiz> => {
        const { data } = await api.get<Quiz>(`/quiz/${id}`);
        return data;
    },
};
