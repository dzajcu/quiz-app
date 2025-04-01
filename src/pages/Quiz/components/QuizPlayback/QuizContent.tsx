import QuizAnswers from "@/pages/Quiz/components/QuizPlayback/QuizAnswers";
import QuizNavigation from "./QuizNavigation";
import QuizSummary from "./QuizSummary";

interface QuizContentProps {
    answers: Array<{
        id: string;
        text: string;
        isCorrect: boolean;
    }>;
    selectedAnswer: string | null;
    onAnswerSelect: (answer: string) => void;
    onPrevious: () => void;
    onNext: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    onFinish: () => void;
    isQuizFinished: boolean;
    quizResults: { correct: number; total: number };
    onReset: () => void;
}

const QuizContent = ({
    answers,
    selectedAnswer,
    onAnswerSelect,
    onPrevious,
    onNext,
    isFirstQuestion,
    isLastQuestion,
    onFinish,
    isQuizFinished,
    quizResults,
    onReset,
}: QuizContentProps) => {
    return (
        <>
            <div className="flex-1 flex items-center justify-center max-lg:hidden mb-4">
                <img
                    src="../XD.png"
                    alt="Question image"
                />
            </div>
            <div className="flex-1">
                <QuizAnswers
                    answers={answers}
                    selectedValue={selectedAnswer}
                    onAnswerSelect={onAnswerSelect}
                />
            </div>
            <QuizNavigation
                onPrevious={onPrevious}
                onNext={onNext}
                onFinish={onFinish}
                isFirstQuestion={isFirstQuestion}
                isLastQuestion={isLastQuestion}
            />
            <QuizSummary
                isOpen={isQuizFinished}
                correctAnswers={quizResults.correct}
                totalQuestions={quizResults.total}
                onReset={onReset}
            />
        </>
    );
};

export default QuizContent;
