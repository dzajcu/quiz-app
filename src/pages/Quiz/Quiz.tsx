import quizData from "@/data/quizData.json";
import { useQuizPlayback } from "@/hooks/quiz/useQuizPlayback";
import BackgroundLayout from "@/components/BackgroundLayout";
import QuizHeader from "./components/QuizPlayback/QuizHeader";
import QuizContent from "./components/QuizPlayback/QuizContent";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface QuizType {
    id: string;
    title: string;
    questions: {
        id: number;
        question: string;
        answers: Array<{
            id: string;
            text: string;
            isCorrect: boolean;
        }>;
    }[];
}

const Quiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState<QuizType | null>(null);
    const [loading, setLoading] = useState(true);

    const {
        currentQuestionIndex,
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
    } = useQuizPlayback(
        quiz
            ? {
                  questions: quiz.questions,
                  initialIndex: 0,
              }
            : undefined
    );

    useEffect(() => {
        if (quizId) {
            const foundQuiz = quizData.quizzes.find((q) => q.id === quizId);
            if (foundQuiz) {
                setQuiz(foundQuiz);
            }
        }
        setLoading(false);
    }, [quizId]);

    if (!loading && !quiz) {
        return (
            <Navigate
                to="/quiz"
                replace
            />
        );
    }

    if (loading || !quiz) {
        return <div>Loading quiz...</div>;
    }

    const isFirstQuestion = currentQuestionIndex === 0;

    const leftSection = (
        <>
            <QuizHeader
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={quiz.questions.length}
                questionText={currentQuestion.question}
            />
            <img
                className="max-lg:hidden"
                src="./asd"
                alt="Logo"
            />
        </>
    );

    const rightSection = (
        <QuizContent
            answers={currentQuestion.answers}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            onFinish={handleFinishQuiz}
            isQuizFinished={isQuizFinished}
            quizResults={quizResults}
            onReset={resetQuiz}
        />
    );

    return (
        <BackgroundLayout
            leftSection={leftSection}
            rightSection={rightSection}
        />
    );
};

export default Quiz;
