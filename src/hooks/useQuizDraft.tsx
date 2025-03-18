import { useState, useCallback, useEffect } from "react";
import { Question } from "@/types/quiz"; // Zaimportuj interfejs Question

interface UseQuizDraft {
    draftQuestions: Question[];
    draftQuizTitle: string;
    saveDraft: (questions: Question[], title: string) => void;
    clearDraft: () => void;
    hasDraft: boolean;
}

const useQuizDraft = (): UseQuizDraft => {
    const [draftQuestions, setDraftQuestions] = useState<Question[]>([]);
    const [draftQuizTitle, setDraftQuizTitle] = useState<string>("");
    const [hasDraft, setHasDraft] = useState<boolean>(false);

    // Load draft from localStorage when hook is initialized
    useEffect(() => {
        const savedDraft = localStorage.getItem("quizDraft");
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                setDraftQuestions(draft.questions || []);
                setDraftQuizTitle(draft.title || "");
                setHasDraft(true);
            } catch (error) {
                console.error("Error loading draft:", error);
                setDraftQuestions([]);
                setDraftQuizTitle("");
                setHasDraft(false);
            }
        } else {
            setDraftQuestions([]);
            setDraftQuizTitle("");
            setHasDraft(false);
        }
    }, []);

    const saveDraft = useCallback((questions: Question[], title: string) => {
        try {
            localStorage.setItem("quizDraft", JSON.stringify({ title, questions }));
            setDraftQuestions(questions);
            setDraftQuizTitle(title);
            setHasDraft(true);
        } catch (error) {
            console.error("Error saving draft:", error);
        }
    }, []);

    const clearDraft = useCallback(() => {
        localStorage.removeItem("quizDraft");
        setDraftQuestions([]);
        setDraftQuizTitle("");
        setHasDraft(false);
    }, []);

    return {
        draftQuestions,
        draftQuizTitle,
        saveDraft,
        clearDraft,
        hasDraft,
    };
};

export default useQuizDraft;
