import { ArrowLeft, Menu } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { QuizHeaderProps } from "@/types/quiz";

const QuizHeader = ({
    currentQuestionIndex,
    totalQuestions,
    questionText,
}: QuizHeaderProps) => {
    const { isMobile } = useSidebar();

    return (
        <>
            <div className="w-max">
                <div className="flex items-center opacity-70 cursor-pointer p-2 group hover:opacity-80">
                    <ArrowLeft className="h-3.5 w-3.5 text-primary mr-2 transition-transform group-hover:-translate-x-1" />
                    <p className="underline text-xs font-bold text-primary">
                        Return
                    </p>
                </div>
                {isMobile ? (
                    <SidebarTrigger>
                        <Menu />
                    </SidebarTrigger>
                ) : (
                    ""
                )}
            </div>
            <div className="font-bold">
                <p className="mb-4 text-xl text-primary-muted">
                    question {currentQuestionIndex + 1}/{totalQuestions}
                </p>
                <h2 className="text-4xl text-primary max-lg:text-3xl max-lg:mb-10">
                    {questionText}
                </h2>
                <p className="mt-2 text-primary-muted text-sm">Select one answer</p>
            </div>
        </>
    );
};

export default QuizHeader;
