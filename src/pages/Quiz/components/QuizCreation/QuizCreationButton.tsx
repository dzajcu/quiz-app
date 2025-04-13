import QuizCreationDialog from "./QuizCreationDialog";
import { useQuiz } from "@/contexts/QuizContext";
import QuizCreationMethodDialog from "./QuizCreationMethodDialog";
import QuizCreationSaveDraftDialog from "./QuizCreationSaveDraftDialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
const QuizCreationButton = () => {
    const { handleOpenQuizDialog } = useQuiz();

    return (
        <>
            <Card
                onClick={handleOpenQuizDialog}
                className="p-4 max-lg:h-40 max-lg:min-w-52 relative flex items-center bg-primary-button overflow-hidden border-none hover:brightness-110 transition-all cursor-pointer select-none"
            >
                <CardHeader className="p-0">
                    <Plus className="inline-block size-10 text-white" />
                </CardHeader>
                <CardContent className="ml-6 flex max-lg:flex-col p-0 lg:items-center justify-between w-full max-lg:gap-1">
                    <CardTitle className="text-lg text-white">
                        Create New Quiz
                    </CardTitle>
                </CardContent>
            </Card>
            <QuizCreationMethodDialog />
            <QuizCreationDialog />
            <QuizCreationSaveDraftDialog />
        </>
    );
};

export default QuizCreationButton;
