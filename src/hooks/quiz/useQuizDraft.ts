import { useState, useCallback, useEffect } from "react";
import { Question } from "@/types/quiz";
import { toast } from "sonner";

export const useQuizDraft = () => {
    const [hasDraft, setHasDraft] = useState<boolean>(false);

    useEffect(() => {
        const savedDraft = localStorage.getItem("quizDraft");
        if (savedDraft) {
            try {
                JSON.parse(savedDraft); // Just validate JSON
                setHasDraft(true);
            } catch (error) {
                console.error("Error checking draft:", error);
                setHasDraft(false);
            }
        } else {
            setHasDraft(false);
        }
    }, []);

    const saveDraft = useCallback((questions: Question[], title: string, description: string) => {
        try {
            localStorage.setItem("quizDraft", JSON.stringify({ title, questions, description }));
            setHasDraft(true);
            toast.success("Draft Saved", {
                description: "Your quiz draft has been saved.",
            });
        } catch (error) {
            console.error("Error saving draft:", error);
            toast.error("Error saving draft", {
                description: "There was an error saving your draft.",
            });
        }
    }, []);

    const loadDraft = useCallback(() => {
        const savedDraft = localStorage.getItem("quizDraft");
        if (savedDraft) {
            try {
                return JSON.parse(savedDraft);
            } catch (error) {
                console.error("Error loading draft:", error);
                return null;
            }
        }
        return null;
    }, []);

    const clearDraft = useCallback(() => {
        localStorage.removeItem("quizDraft");
        setHasDraft(false);
    }, []);

    return {
        hasDraft,
        saveDraft,
        loadDraft,
        clearDraft,
    };
};
