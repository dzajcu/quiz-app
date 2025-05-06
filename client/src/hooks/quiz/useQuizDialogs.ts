import { useCallback } from "react";
import useDialogState from "@/hooks/useDialogState";

export const useQuizDialogs = (hasUnsavedChanges: () => boolean) => {
    const {
        isOpen: isQuizDialogOpen,
        onOpen: openQuizDialog,
        onClose: closeQuizDialog,
        setIsOpen: setIsQuizDialogOpen,
    } = useDialogState(false);

    const {
        isOpen: isCreateMethodDialogOpen,
        onOpen: openCreateMethodDialog,
        onClose: closeCreateMethodDialog,
        setIsOpen: setShowCreateMethodDialog,
    } = useDialogState(false);

    const {
        isOpen: isSaveDraftDialogOpen,
        onOpen: openSaveDraftDialog,
        onClose: closeSaveDraftDialog,
        setIsOpen: setShowSaveDraftDialog,
    } = useDialogState(false);

    const handleCloseQuizDialog = useCallback(
        (open: boolean) => {
            if (!open && hasUnsavedChanges()) {
                openSaveDraftDialog();
            } else {
                setIsQuizDialogOpen(open);
            }
        },
        [hasUnsavedChanges, openSaveDraftDialog, setIsQuizDialogOpen]
    );

    const handleBackToMethodSelect = useCallback(() => {
        if (hasUnsavedChanges()) {
            openSaveDraftDialog();
        } else {
            closeQuizDialog();
            openCreateMethodDialog();
        }
    }, [
        hasUnsavedChanges,
        openSaveDraftDialog,
        closeQuizDialog,
        openCreateMethodDialog,
    ]);

    const handleCancelSaveDraft = useCallback(() => {
        closeSaveDraftDialog();
        openQuizDialog();
    }, [closeSaveDraftDialog, openQuizDialog]);

    return {
        // Dialog states
        isQuizDialogOpen,
        isCreateMethodDialogOpen,
        isSaveDraftDialogOpen,

        // Dialog actions
        openQuizDialog,
        closeQuizDialog,
        openCreateMethodDialog,
        closeCreateMethodDialog,
        openSaveDraftDialog,
        closeSaveDraftDialog,

        // Dialog handlers
        handleCloseQuizDialog,
        handleBackToMethodSelect,
        handleCancelSaveDraft,
        setShowCreateMethodDialog,
        setShowSaveDraftDialog,
    };
};
