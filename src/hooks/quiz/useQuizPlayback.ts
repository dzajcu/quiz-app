import { useState } from "react";
import quizData from "@/data/quizData.json";
import { UserAnswer, UseQuizPlaybackResult } from "@/types/quiz";

export function useQuizPlayback(): UseQuizPlaybackResult {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

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
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            const nextQuestionId = quizData.questions[currentQuestionIndex + 1].id;
            const nextAnswer = userAnswers.find(
                (a) => a.questionId === nextQuestionId
            );
            setSelectedAnswer(nextAnswer?.answerId || "");
        } else {
            // Quiz completed - calculate results
            const correctAnswers = userAnswers.filter((answer) => {
                const question = quizData.questions.find(
                    (q) => q.id === answer.questionId
                );
                const selectedAnswer = question?.answers.find(
                    (a) => a.id === answer.answerId
                );
                return selectedAnswer?.isCorrect;
            }).length;

            console.log("Quiz completed!");
            console.log(
                `Correct answers: ${correctAnswers} out of ${quizData.questions.length}`
            );
            console.log("User answers:", userAnswers);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            const previousAnswer = userAnswers.find(
                (a) =>
                    a.questionId === quizData.questions[currentQuestionIndex - 1].id
            );
            setSelectedAnswer(previousAnswer?.answerId || "");
        }
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
    };
}
