import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QuizMenuOptionsProps {
    isOpen: boolean;
    onClose: () => void;
    quizTitle: string;
    quizId: string;
}

const QuizMenuOptions = ({
    isOpen,
    onClose,
    quizTitle,
    quizId,
}: QuizMenuOptionsProps) => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        onClose();
        navigate(`/quiz/${quizId}`);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl mb-4">Start Quiz</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    Are you ready to start{" "}
                    <span className="font-bold">{quizTitle}</span>?
                </div>
                <DialogFooter className="max-md:gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleStartQuiz}>Start Quiz</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default QuizMenuOptions;
