import { useState, useCallback, useEffect } from "react";
import { Question } from "@/types/quiz";
import { toast } from "sonner";
import { IconName } from "@/components/ui/icon-picker";

interface QuizDraft {
    questions: Question[];
    title: string;
    description: string;
    icon?: IconName;
    isPublic: boolean;
}

const DRAFT_KEY = "quizDraft";

export const useQuizDraft = () => {
    const [hasDraft, setHasDraft] = useState<boolean>(false);

    useEffect(() => {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
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
    const saveDraft = useCallback(
        (
            questions: Question[],
            title: string,
            description: string,
            icon?: IconName,
            isPublic: boolean = true
        ) => {
            try {
                const draft: QuizDraft = {
                    questions,
                    title,
                    description,
                    icon,
                    isPublic,
                };
                localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
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
        },
        []
    );

    const loadDraft = useCallback((): QuizDraft | null => {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
            try {
                return JSON.parse(savedDraft) as QuizDraft;
            } catch (error) {
                console.error("Error loading draft:", error);
                return null;
            }
        }
        return null;
    }, []);

    const clearDraft = useCallback(() => {
        localStorage.removeItem(DRAFT_KEY);
        setHasDraft(false);
    }, []);

    return {
        hasDraft,
        saveDraft,
        loadDraft,
        clearDraft,
    };
};
