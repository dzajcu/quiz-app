import { useEffect, useCallback, useState } from "react";
import { useBlocker } from "react-router-dom";

interface UseQuizExitProps {
    isQuizActive: boolean;
    onExitConfirm: () => void;
}

interface UseQuizExitReturn {
    isExitDialogOpen: boolean;
    setIsExitDialogOpen: (open: boolean) => void;
    handleReturn: () => void;
    handleExitConfirm: () => void;
    handleExitCancel: () => void;
}

export const useQuizExit = ({
    isQuizActive,
    onExitConfirm,
}: UseQuizExitProps): UseQuizExitReturn => {
    const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        return isQuizActive && currentLocation.pathname !== nextLocation.pathname;
    });

    useEffect(() => {
        if (blocker.state === "blocked") {
            setIsExitDialogOpen(true);
        }
    }, [blocker.state]);

    useEffect(() => {
        if (!isQuizActive) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isQuizActive) {
                event.preventDefault();
                event.returnValue =
                    "Are you sure you want to leave? Your quiz progress will be lost.";
                return "Are you sure you want to leave? Your quiz progress will be lost.";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isQuizActive]);

    const handleReturn = useCallback(() => {
        setIsExitDialogOpen(true);
    }, []);

    const handleExitConfirm = useCallback(() => {
        setIsExitDialogOpen(false);

        if (blocker.state === "blocked") {
            blocker.proceed();
        } else {
            onExitConfirm();
        }
    }, [blocker, onExitConfirm]);

    const handleExitCancel = useCallback(() => {
        setIsExitDialogOpen(false);

        if (blocker.state === "blocked") {
            blocker.reset();
        }
    }, [blocker]);

    return {
        isExitDialogOpen,
        setIsExitDialogOpen,
        handleReturn,
        handleExitConfirm,
        handleExitCancel,
    };
};
