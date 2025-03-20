import QuizAnswers from "@/pages/Quiz/components/QuizPlayback/QuizAnswers";
import QuizNavigation from "./QuizNavigation";
import { QuizContentProps } from "@/types/quiz";

const QuizContent = ({
    answers,
    selectedAnswer,
    onAnswerSelect,
    onPrevious,
    onNext,
    isFirstQuestion,
    isLastQuestion,
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
                isFirstQuestion={isFirstQuestion}
                isLastQuestion={isLastQuestion}
            />
        </>
    );
};

export default QuizContent;
