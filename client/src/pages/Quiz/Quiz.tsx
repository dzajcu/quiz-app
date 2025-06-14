import { useQuizPlayback } from "@/hooks/quiz/useQuizPlayback";
import { useQuizExit } from "@/hooks/quiz/useQuizExit";
import BackgroundLayout from "@/components/BackgroundLayout";
import QuizHeader from "./components/QuizPlayback/QuizHeader";
import QuizContent from "./components/QuizPlayback/QuizContent";
import QuizExitDialog from "./components/QuizPlayback/QuizExitDialog";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { quizService } from "@/services/quiz.service";

interface QuizType {
    _id: string;
    title: string;
    questions: {
        _id: string;
        question: string;
        answers: Array<{
            _id: string;
            text: string;
            isCorrect: boolean;
        }>;
    }[];
}

const Quiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<QuizType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (quizId) {
            const fetchQuiz = async () => {
                try {
                    const quizFromApi = await quizService.getQuizById(quizId);
                    setQuiz(quizFromApi.quiz);
                } catch (error) {
                    console.error("Error fetching quiz:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchQuiz();
        }
    }, [quizId]);

    const questionsForPlayback =
        quiz?.questions.map((q) => ({
            id: q._id,
            question: q.question,
            answers: q.answers.map((a) => ({
                id: a._id,
                text: a.text,
                isCorrect: a.isCorrect,
            })),
        })) || [];

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
    } = useQuizPlayback({ questions: questionsForPlayback });

    // Quiz exit handling
    const {
        isExitDialogOpen,
        setIsExitDialogOpen,
        handleReturn,
        handleExitConfirm,
        handleExitCancel,
    } = useQuizExit({
        isQuizActive: !isQuizFinished && quiz !== null,
        onExitConfirm: () => navigate("/quiz"),
    });

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
                onReturn={handleReturn}
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
        <>
            <BackgroundLayout
                leftSection={leftSection}
                rightSection={rightSection}
                isEven={false}
            />
            <QuizExitDialog
                isOpen={isExitDialogOpen}
                onClose={handleExitCancel}
                onConfirm={handleExitConfirm}
            />
        </>
    );
};

export default Quiz;
