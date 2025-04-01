import { Button } from "@/components/ui/button";

interface QuizNavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    onFinish: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
}

const QuizNavigation = ({
    onPrevious,
    onNext,
    onFinish,
    isFirstQuestion,
    isLastQuestion,
}: QuizNavigationProps) => {
    return (
        <div className="flex m-auto gap-6 mt-8">
            <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isFirstQuestion}
            >
                Previous
            </Button>
            {isLastQuestion ? (
                <Button
                    className="px-6 py-2 w-24"
                    onClick={onFinish}
                >
                    Finish Quiz
                </Button>
            ) : (
                <Button
                    className="px-6 py-2 w-24"
                    onClick={onNext}
                >
                    Next
                </Button>
            )}
        </div>
    );
};

export default QuizNavigation;
