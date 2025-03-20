import { Button } from "@/components/ui/button";
import { QuizNavigationProps } from "@/types/quiz";

const QuizNavigation = ({
    onPrevious,
    onNext,
    isFirstQuestion,
    isLastQuestion,
}: QuizNavigationProps) => {
    return (
        <div className="flex m-auto gap-6">
            <Button
                variant={"outline"}
                className="px-6 py-2 w-24"
                onClick={onPrevious}
                disabled={isFirstQuestion}
            >
                Previous
            </Button>
            <Button
                className="px-6 py-2 w-24"
                onClick={onNext}
            >
                {isLastQuestion ? "Finish" : "Next"}
            </Button>
        </div>
    );
};

export default QuizNavigation;
