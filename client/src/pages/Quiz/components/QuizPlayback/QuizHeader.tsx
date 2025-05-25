import { ArrowLeft } from "lucide-react";
import { QuizHeaderProps } from "@/types/quiz";
import { useIsMedium } from "@/hooks/use-medium";
import Logo from "@/components/Logo";
const QuizHeader = ({
    currentQuestionIndex,
    totalQuestions,
    questionText,
    onReturn,
}: QuizHeaderProps) => {
    const isMedium = useIsMedium();
    const handleReturn = () => {
        onReturn?.();
    };

    return (
        <div className="flex flex-col justify-between h-full">
            <div
                className="flex items-center opacity-70 cursor-pointer p-2 group hover:opacity-80"
                onClick={handleReturn}
            >
                <ArrowLeft className="h-3.5 w-3.5 text-primary mr-2 transition-transform group-hover:-translate-x-1" />
                <p className="underline text-xs font-bold text-primary">Return</p>
            </div>
            <div className="font-bold">
                <p className="mb-4 text-xl max-md:text-base text-primary-muted">
                    question {currentQuestionIndex + 1}/{totalQuestions}
                </p>
                <h2 className="text-4xl text-primary max-lg:text-3xl max-md:text-xl max-lg:mb-10">
                    {questionText}
                </h2>
                <p className="mt-2 text-primary-muted text-sm max-md:text-xs">
                    Select one answer
                </p>
            </div>
            {!isMedium && <Logo />}
        </div>
    );
};

export default QuizHeader;
