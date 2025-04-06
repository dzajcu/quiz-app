import { useState, useCallback } from "react";
import { Question } from "@/types/quiz";

export const useQuizState = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizTitle, setQuizTitle] = useState<string>("");
    const [quizDescription, setQuizDescription] = useState<string>("");
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
        setQuestions([]);
        setQuizTitle("");
        setQuizDescription("");
    }, []);

    return {
        questions,
        setQuestions,
        quizTitle,
        setQuizTitle,
        quizDescription,
        setQuizDescription,
        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
        resetQuiz,
    };
};
