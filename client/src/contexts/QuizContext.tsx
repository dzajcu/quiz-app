import React, { createContext, useContext, useCallback, ReactNode } from "react";
import { useQuizState } from "@/hooks/quiz/useQuizState";
import { useQuizDraft } from "@/hooks/quiz/useQuizDraft";
import { useQuizDialogs } from "@/hooks/quiz/useQuizDialogs";
import { useQuizFiles } from "@/hooks/quiz/useQuizFiles";
import { toast } from "sonner";
import { QuizContextType } from "@/types/quiz";
import { quizService } from "@/services/quiz.service";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {
        questions,
        setQuestions,
        quizTitle,
        setQuizTitle,
        quizDescription,
        setQuizDescription,
        quizIcon,
        setQuizIcon,
        isPublic,
        setIsPublic,
        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
        handleCorrectAnswerChange,
        resetQuiz,
    } = useQuizState();

    const { hasDraft, saveDraft, loadDraft, clearDraft } = useQuizDraft();

    const hasUnsavedChanges = useCallback(() => {
        return (
            questions.some((q) => q.question || q.answers.some((a) => a)) ||
            quizTitle.trim() !== "" ||
            quizDescription.trim() !== "" ||
            quizIcon !== undefined
        );
    }, [questions, quizTitle, quizDescription, quizIcon]);

    const {
        isQuizDialogOpen,
        isCreateMethodDialogOpen,
        isSaveDraftDialogOpen,
        openQuizDialog,
        closeQuizDialog,
        openCreateMethodDialog,
        closeCreateMethodDialog,
        closeSaveDraftDialog,
        handleCloseQuizDialog,
        handleBackToMethodSelect,
        handleCancelSaveDraft,
        setShowCreateMethodDialog,
        setShowSaveDraftDialog,
    } = useQuizDialogs(hasUnsavedChanges);

    const { handleFileSelect, handleManualCreate } = useQuizFiles({
        setQuestions,
        setQuizTitle,
        setQuizDescription,
        closeCreateMethodDialog,
        openQuizDialog,
    });
    const handleSaveQuiz = useCallback(() => {
        const validateQuiz = () => {
            if (questions.length === 0) return false;
            return questions.some(
                (q) =>
                    q.question.trim() !== "" &&
                    q.answers.filter((a: string) => a.trim() !== "").length >= 2
            );
        };

        if (!validateQuiz()) {
            toast.error("Validation Error", {
                description:
                    "Quiz must have at least one question with two answers.",
            });
            return;
        }

        quizService
            .createQuiz(quizTitle, questions, isPublic, quizIcon)
            .then(() => {
                toast.success("Success", {
                    description: "Quiz has been created successfully!",
                });
                clearDraft();
                resetQuiz();
                closeQuizDialog();
            })
            .catch((error) => {
                console.error("Error creating quiz:", error);
                toast.error("Error", {
                    description:
                        error.response?.data?.message ||
                        "Failed to create quiz. Please try again.",
                });
            });
    }, [
        questions,
        quizTitle,
        quizIcon,
        isPublic,
        clearDraft,
        resetQuiz,
        closeQuizDialog,
    ]);
    const handleSaveDraft = useCallback(() => {
        saveDraft(questions, quizTitle, quizDescription, quizIcon, isPublic);
        closeSaveDraftDialog();
        closeQuizDialog();
    }, [
        questions,
        quizTitle,
        quizDescription,
        quizIcon,
        isPublic,
        saveDraft,
        closeSaveDraftDialog,
        closeQuizDialog,
    ]);

    const handleDiscardDraft = useCallback(() => {
        clearDraft();
        resetQuiz();
        closeSaveDraftDialog();
        closeQuizDialog();
    }, [clearDraft, resetQuiz, closeSaveDraftDialog, closeQuizDialog]);

    const handleOpenQuizDialog = useCallback(() => {
        if (hasDraft) {
            const draft = loadDraft();
            if (draft) {
                setQuestions(draft.questions || []);
                setQuizDescription(draft.description || "");
                setQuizTitle(draft.title || "");
                setQuizIcon(draft.icon);
                setIsPublic(draft.isPublic !== undefined ? draft.isPublic : true);
                openQuizDialog();
            } else {
                openCreateMethodDialog();
            }
        } else {
            openCreateMethodDialog();
        }
    }, [
        hasDraft,
        loadDraft,
        setQuestions,
        setQuizTitle,
        setQuizDescription,
        setQuizIcon,
        setIsPublic,
        openQuizDialog,
        openCreateMethodDialog,
    ]);
    const contextValue: QuizContextType = {
        // State
        questions,
        quizTitle,
        setQuizTitle,
        quizDescription,
        setQuizDescription,
        quizIcon,
        setQuizIcon,
        isPublic,
        setIsPublic,
        hasDraft,

        // Dialog states
        isQuizDialogOpen,
        isCreateMethodDialogOpen,
        isSaveDraftDialogOpen,

        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
        handleCorrectAnswerChange,
        handleSaveQuiz,
        handleSaveDraft,
        handleDiscardDraft,
        handleOpenQuizDialog,
        handleCloseQuizDialog,
        handleBackToMethodSelect,
        handleCancelSaveDraft,
        setShowCreateMethodDialog,
        setShowSaveDraftDialog,
        handleFileSelect,
        handleManualCreate,
    };

    return (
        <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
    );
};

export const useQuiz = (): QuizContextType => {
    const context = useContext(QuizContext);

    if (context === undefined) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }

    return context;
};
