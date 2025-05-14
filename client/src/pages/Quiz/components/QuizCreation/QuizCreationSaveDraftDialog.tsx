import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/contexts/QuizContext";
import { Archive, Globe, Lock, Trash2 } from "lucide-react";
import { Icon } from "@/components/ui/icon-picker";

const QuizCreationSaveDraftDialog = () => {
    const {
        isSaveDraftDialogOpen,
        handleCancelSaveDraft,
        handleSaveDraft,
        handleDiscardDraft,
        quizTitle,
        quizDescription,
        quizIcon,
        isPublic,
        questions,
    } = useQuiz();

    const validQuestionCount = questions.filter(
        (q) => q.question.trim() !== "" && q.answers.some((a) => a.trim() !== "")
    ).length;

    return (
        <Dialog
            open={isSaveDraftDialogOpen}
            onOpenChange={handleCancelSaveDraft}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save Draft Quiz</DialogTitle>
                    <DialogDescription>
                        Your progress will be saved locally. You can continue editing
                        later.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3">
                    <div className="flex items-center gap-2">
                        {quizIcon && (
                            <Icon
                                name={quizIcon}
                                className="h-5 w-5"
                            />
                        )}
                        <h3 className="font-medium">
                            {quizTitle || "Untitled Quiz"}
                        </h3>
                    </div>
                    {quizDescription && (
                        <p className="text-sm text-muted-foreground">
                            {quizDescription}
                        </p>
                    )}{" "}
                    <div className="text-sm">
                        <span className="font-medium">{validQuestionCount}</span>{" "}
                        question{validQuestionCount !== 1 ? "s" : ""} with content
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {isPublic ? (
                            <>
                                <Globe className="h-4 w-4" />
                                <span>Public quiz</span>
                            </>
                        ) : (
                            <>
                                <Lock className="h-4 w-4" />
                                <span>Private quiz</span>
                            </>
                        )}
                    </div>
                </div>
                <DialogFooter className="flex sm:justify-between gap-2">
                    <Button
                        variant="destructive"
                        onClick={handleDiscardDraft}
                        className="w-full sm:w-auto flex-1 sm:flex-initial"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Discard
                    </Button>
                    <Button
                        onClick={handleSaveDraft}
                        className="w-full sm:w-auto flex-1 sm:flex-initial"
                    >
                        <Archive className="h-4 w-4 mr-2" />
                        Save Draft
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default QuizCreationSaveDraftDialog;
