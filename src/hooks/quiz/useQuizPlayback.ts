import { useState } from "react";
import { UserAnswer, UseQuizPlaybackResult } from "@/types/quiz";

interface UseQuizPlaybackProps {
    questions: Array<{
        id: number;
        question: string;
        answers: Array<{
            id: string;
            text: string;
            isCorrect: boolean;
        }>;
    }>;
    initialIndex?: number;
}

export const useQuizPlayback = (
    props?: UseQuizPlaybackProps
): UseQuizPlaybackResult => {
    const questions = props?.questions || [];
    const initialIndex = props?.initialIndex || 0;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [quizResults, setQuizResults] = useState({ correct: 0, total: 0 });

    const currentQuestion = questions[currentQuestionIndex] || {
        id: 0,
        question: "",
        answers: [],
    };
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleAnswerSelect = (value: string) => {
        setSelectedAnswer(value);
        setUserAnswers((prev) => {
            const filtered = prev.filter((a) => a.questionId !== currentQuestion.id);
            return [
                ...filtered,
                { questionId: currentQuestion.id, answerId: value },
            ];
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            const nextQuestionId = questions[currentQuestionIndex + 1].id;
            const nextAnswer = userAnswers.find(
                (a) => a.questionId === nextQuestionId
            );
            setSelectedAnswer(nextAnswer?.answerId || null);
        } else {
            handleFinishQuiz();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            const previousAnswer = userAnswers.find(
                (a) => a.questionId === questions[currentQuestionIndex - 1].id
            );
            setSelectedAnswer(previousAnswer?.answerId || null);
        }
    };

    const handleFinishQuiz = () => {
        const correctCount = userAnswers.filter((answer) => {
            const question = questions.find((q) => q.id === answer.questionId);
            const selectedAnswer = question?.answers.find(
                (a) => a.id === answer.answerId
            );
            return selectedAnswer?.isCorrect;
        }).length;

        setQuizResults({
            correct: correctCount,
            total: questions.length,
        });
        setIsQuizFinished(true);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(initialIndex);
        setUserAnswers([]);
        setSelectedAnswer(null);
        setIsQuizFinished(false);
        setQuizResults({ correct: 0, total: 0 });
    };

    return {
        currentQuestionIndex,
        userAnswers,
        selectedAnswer,
        currentQuestion,
        handleAnswerSelect,
        handleNextQuestion,
        handlePreviousQuestion,
        isLastQuestion,
        isQuizFinished,
        quizResults,
        handleFinishQuiz,
        resetQuiz,
    };
};
