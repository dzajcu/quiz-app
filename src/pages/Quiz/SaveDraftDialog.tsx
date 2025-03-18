// components/QuizMenu/SaveDraftDialog.tsx
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
import useDialogState from "@/hooks/useDialogState";

interface SaveDraftDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSaveDraft: () => void;
    onDiscardDraft: () => void;
    onCancel: () => void;
}

const SaveDraftDialog: React.FC<SaveDraftDialogProps> = ({
    open,
    onOpenChange,
    onSaveDraft,
    onDiscardDraft,
    onCancel,
}) => {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
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
                    <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogCancel
                        className="bg-destructive text-destructive-foreground hover:bg-red-600 border-none hover:text-white"
                        onClick={onDiscardDraft}
                    >
                        Discard
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onSaveDraft}>
                        Save Draft
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SaveDraftDialog;
