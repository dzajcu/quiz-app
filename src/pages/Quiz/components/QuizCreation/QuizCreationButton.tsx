import QuizCreationDialog from "./QuizCreationDialog";
import { useQuiz } from "@/contexts/QuizContext";
import QuizCreationMethodDialog from "./QuizCreationMethodDialog";
import QuizCreationSaveDraftDialog from "./QuizCreationSaveDraftDialog";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

const QuizCreationButton = () => {
    const { handleOpenQuizDialog } = useQuiz();

    return (
        <>
            <Card
                onClick={handleOpenQuizDialog}
                className="relative w-72 max-w-xs h-36 flex flex-col justify-between bg-primary overflow-hidden cursor-pointer"
            >
                <CardHeader className="py-4">
                    <Plus className="inline-block mr-2 size-12 text-white" />
                </CardHeader>
                <CardContent className="py-4">
                    <CardTitle className="text-xl text-white">Create New Quiz</CardTitle>
                </CardContent>
                {/* <CardFooter className="py-2 text-sm text-white">
                    chuj zajebany
                </CardFooter> */}
                <div className="h-32 w-32 bg-white opacity-30 rounded-full absolute right-[-22px] bottom-[-40px]"></div>
                <div className="h-32 w-32 bg-white opacity-30 rounded-full absolute right-[-60px] top-[-30px]"></div>
            </Card>
            <QuizCreationMethodDialog />
            <QuizCreationDialog />
            <QuizCreationSaveDraftDialog />
        </>
    );
};

export default QuizCreationButton;
