import { useState, useCallback } from "react";
import { QuizQuestion } from "@/types/quiz";
import { IconName } from "@/components/ui/icon-picker";

export const useQuizState = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([
        {
            question: "",
            answers: ["", "", "", ""],
        },
    ]);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [quizIcon, setQuizIcon] = useState<IconName | undefined>(undefined);

    const handleAddQuestion = useCallback(() => {
        setQuestions((prev) => [
            ...prev,
            { question: "", answers: ["", "", "", ""] },
        ]);
    }, []);

    const handleDeleteQuestion = useCallback((index: number) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const handleQuestionChange = useCallback(
        (index: number, questionText: string) => {
            setQuestions((prev) => {
                const newQuestions = [...prev];
                newQuestions[index] = {
                    ...newQuestions[index],
                    question: questionText,
                };
                return newQuestions;
            });
        },
        []
    );

    const handleAnswerChange = useCallback(
        (questionIndex: number, answerIndex: number, answerText: string) => {
            setQuestions((prev) => {
                const newQuestions = [...prev];
                newQuestions[questionIndex].answers[answerIndex] = answerText;
                return newQuestions;
            });
        },
        []
    );

    const resetQuiz = useCallback(() => {
        setQuestions([
            {
                question: "",
                answers: ["", "", "", ""],
            },
        ]);
        setQuizTitle("");
        setQuizDescription("");
        setQuizIcon(undefined);
    }, []);

    return {
        questions,
        setQuestions,
        quizTitle,
        setQuizTitle,
        quizDescription,
        setQuizDescription,
        quizIcon,
        setQuizIcon,
        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
        resetQuiz,
    };
};
