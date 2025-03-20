import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import QuizCreationDialog from "./QuizCreationDialog";
import { useQuiz } from "@/contexts/QuizContext";
import QuizCreationMethodDialog from "./QuizCreationMethodDialog";
import QuizCreationSaveDraftDialog from "./QuizCreationSaveDraftDialog";

const QuizCreationButton = () => {

    const { handleOpenQuizDialog } = useQuiz();

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Quiz Menu</h1>
                <Button
                    className="flex items-center gap-2"
                    onClick={handleOpenQuizDialog}
                >
                    <Plus className="w-4 h-4" />
                    Create New Quiz
                </Button>
            </div>
            <QuizCreationMethodDialog />
            <QuizCreationDialog />
            <QuizCreationSaveDraftDialog />
        </div>
    );
};

export default QuizCreationButton;
