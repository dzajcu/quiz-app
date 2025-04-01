import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface QuizSummaryProps {
    isOpen: boolean;
    correctAnswers: number;
    totalQuestions: number;
    onReset: () => void;
}

const QuizSummary = ({
    isOpen,
    correctAnswers,
    totalQuestions,
    onReset,
}: QuizSummaryProps) => {
    const navigate = useNavigate();
    const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

    // Reset confetti state when dialog closes
    useEffect(() => {
        if (!isOpen) {
            setHasTriggeredConfetti(false);
        }
    }, [isOpen]);

    // Trigger confetti when dialog opens
    useEffect(() => {
        if (isOpen && !hasTriggeredConfetti) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#4CAF50", "#2196F3", "#FFC107", "#E91E63"],
            });
            setHasTriggeredConfetti(true);
        }
    }, [isOpen, hasTriggeredConfetti]);

    const handleReturnToMenu = () => {
        navigate("/quiz");
    };

    const handleReset = () => {
        setHasTriggeredConfetti(false); // Reset confetti state
        onReset();
    };

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={() => {}} // prevents closing when clicking outside
        >
            <DialogContent
                className="sm:max-w-md"
                onInteractOutside={(e) => e.preventDefault()} // prevents interaction with background
                onEscapeKeyDown={(e) => e.preventDefault()} // prevents closing with Esc key
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl mb-4">
                        Quiz Completed!
                    </DialogTitle>
                </DialogHeader>
                <div className="py-6 text-center">
                    <p className="text-5xl font-bold mb-2">
                        {correctAnswers}/{totalQuestions}
                    </p>
                    <p className="text-lg text-muted-foreground">
                        {percentage}% Correct
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Nice job completing the quiz!
                    </p>
                </div>
                <DialogFooter className="flex flex-col gap-2">
                    <Button
                        onClick={handleReturnToMenu}
                        className="w-full"
                    >
                        Return to Menu
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleReset} // Use our new handler
                        className="w-full"
                    >
                        Try Again
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default QuizSummary;
