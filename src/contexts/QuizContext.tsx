import React, { createContext, useContext, useCallback, ReactNode } from "react";
import { useQuizState } from "@/hooks/quiz/useQuizState";
import { useQuizDraft } from "@/hooks/quiz/useQuizDraft";
import { useQuizDialogs } from "@/hooks/quiz/useQuizDialogs";
import { useQuizFiles } from "@/hooks/quiz/useQuizFiles";
import quizData from "@/data/quizData.json";
import { toast } from "sonner";
import { QuizContextType } from "@/types/quiz";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {
        questions,
        setQuestions,
        quizTitle,
        setQuizTitle,
        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
        resetQuiz,
    } = useQuizState();

    const { hasDraft, saveDraft, loadDraft, clearDraft } = useQuizDraft();

    const hasUnsavedChanges = useCallback(() => {
        return (
            questions.some((q) => q.question || q.answers.some((a) => a)) ||
            quizTitle.trim() !== ""
        );
    }, [questions, quizTitle]);

    const {
        isQuizDialogOpen,
        isCreateMethodDialogOpen,
        isSaveDraftDialogOpen,
        openQuizDialog,
        closeQuizDialog,
        openCreateMethodDialog,
        closeCreateMethodDialog,
        handleCloseQuizDialog,
        handleBackToMethodSelect,
        handleCancelSaveDraft,
        setShowCreateMethodDialog,
        setShowSaveDraftDialog,
    } = useQuizDialogs(hasUnsavedChanges);

    const { handleFileSelect, handleManualCreate } = useQuizFiles({
        setQuestions,
        setQuizTitle,
        closeCreateMethodDialog,
        openQuizDialog,
    });

    // Quiz action functions
    const handleSaveQuiz = useCallback(() => {
        const validateQuiz = () => {
            if (questions.length === 0) return false;
            return questions.some(
                (q) =>
                    q.question.trim() !== "" &&
                    q.answers.filter((a) => a.trim() !== "").length >= 2
            );
        };

        if (!validateQuiz()) {
            toast.error("Validation Error", {
                description:
                    "Quiz must have at least one question with two answers.",
            });
            return;
        }

        const formattedQuestions = questions.map((q, qIndex) => ({
            id: quizData.questions.length + qIndex + 1,
            question: q.question,
            answers: q.answers.map((text, index) => ({
                id: String.fromCharCode(97 + index),
                text,
                isCorrect: index === 0,
            })),
        }));

        console.log("Saving quiz with questions:", formattedQuestions);
        toast.success("Success", {
            description: "Quiz has been created successfully!",
        });

        clearDraft();
        resetQuiz();
        closeQuizDialog();
    }, [questions, clearDraft, resetQuiz, closeQuizDialog]);

    const handleSaveDraft = useCallback(() => {
        saveDraft(questions, quizTitle);
        closeQuizDialog();
    }, [questions, quizTitle, saveDraft, closeQuizDialog]);

    const handleDiscardDraft = useCallback(() => {
        clearDraft();
        resetQuiz();
        closeQuizDialog();
    }, [clearDraft, resetQuiz, closeQuizDialog]);

    const handleOpenQuizDialog = useCallback(() => {
        if (hasDraft) {
            const draft = loadDraft();
            if (draft) {
                setQuestions(draft.questions || []);
                setQuizTitle(draft.title || "");
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
        openQuizDialog,
        openCreateMethodDialog,
    ]);

    const contextValue: QuizContextType = {
        // State
        questions,
        quizTitle,
        setQuizTitle,
        hasDraft,

        // Dialog states
        isQuizDialogOpen,
        isCreateMethodDialogOpen,
        isSaveDraftDialogOpen,

        // Handlers
        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
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

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = (): QuizContextType => {
    const context = useContext(QuizContext);

    if (context === undefined) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }

    return context;
};
