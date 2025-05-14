import { useState, useCallback } from "react";
import { Question } from "@/types/quiz";
import { IconName } from "@/components/ui/icon-picker";

export const useQuizState = () => {
    const [questions, setQuestions] = useState<Question[]>([
        {
            question: "",
            answers: ["", "", "", ""],
            correctAnswerIndex: 0,
        },
    ]);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [quizIcon, setQuizIcon] = useState<IconName | undefined>(undefined);
    const [isPublic, setIsPublic] = useState(true);
    const handleAddQuestion = useCallback(() => {
        setQuestions((prev) => [
            ...prev,
            { question: "", answers: ["", "", "", ""], correctAnswerIndex: 0 },
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
    const handleCorrectAnswerChange = useCallback(
        (questionIndex: number, correctAnswerIndex: number) => {
            setQuestions((prev) => {
                const newQuestions = [...prev];
                newQuestions[questionIndex] = {
                    ...newQuestions[questionIndex],
                    correctAnswerIndex,
                };
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
                correctAnswerIndex: 0,
            },
        ]);
        setQuizTitle("");
        setQuizDescription("");
        setQuizIcon(undefined);
        setIsPublic(true);
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
        isPublic,
        setIsPublic,
        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
        handleCorrectAnswerChange,
        resetQuiz,
    };
};
