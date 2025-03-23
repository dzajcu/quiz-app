import quizData from "@/data/quizData.json";
import { useQuizPlayback } from "@/hooks/quiz/useQuizPlayback";
import BackgroundLayout from "@/components/BackgroundLayout";
import QuizHeader from "./components/QuizPlayback/QuizHeader";
import QuizContent from "./components/QuizPlayback/QuizContent";

const Quiz = () => {
    const {
        currentQuestionIndex,
        selectedAnswer,
        currentQuestion,
        handleAnswerSelect,
        handleNextQuestion,
        handlePreviousQuestion,
        isLastQuestion,
    } = useQuizPlayback();

    const isFirstQuestion = currentQuestionIndex === 0;

    const leftSection = (
        <>
            <QuizHeader
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={quizData.questions.length}
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
