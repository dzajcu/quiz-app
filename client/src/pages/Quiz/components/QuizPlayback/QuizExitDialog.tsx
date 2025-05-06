import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QuizExitDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const QuizExitDialog = ({ isOpen, onClose, onConfirm }: QuizExitDialogProps) => {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Exit Quiz</DialogTitle>
                </DialogHeader>
                <div>Are you sure you want to exit? Your progress will be lost.</div>
                <DialogFooter className="max-md:gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="hover:bg-red-600"
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        Exit Quiz
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default QuizExitDialog;
