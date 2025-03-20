import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuiz } from "@/contexts/QuizContext";

const SaveDraftDialog = () => {
    const {
        isSaveDraftDialogOpen,
        setShowSaveDraftDialog,
        handleSaveDraft,
        handleDiscardDraft,
        handleCancelSaveDraft,
    } = useQuiz();

    return (
        <AlertDialog
            open={isSaveDraftDialogOpen}
            onOpenChange={setShowSaveDraftDialog}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Save Draft?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Would you like to save your quiz as a draft? You can continue
                        editing it later.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancelSaveDraft}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogCancel
                        className="bg-destructive text-destructive-foreground hover:bg-red-600 border-none hover:text-white"
                        onClick={handleDiscardDraft}
                    >
                        Discard
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleSaveDraft}>
                        Save Draft
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SaveDraftDialog;
