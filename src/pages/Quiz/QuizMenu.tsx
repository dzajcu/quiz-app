import BackgroundSection from "@/components/ui/background-section";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import quizData from "@/data/quizData.json";
import { QuizFile, Question } from "@/types/quiz";
import CreateMethodDialog from "./CreateMethodDialog";
import QuizCreationDialog from "./QuizCreationDialog";
import SaveDraftDialog from "./SaveDraftDialog";
import useDialogState from "@/hooks/useDialogState";
import useQuizDraft from "@/hooks/useQuizDraft";

const QuizMenu = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizTitle, setQuizTitle] = useState<string>("");

    const {
        isOpen: isDialogOpen,
        onOpen: openDialog,
        onClose: closeDialog,
        setIsOpen: setIsDialogOpen,
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

    const { draftQuestions, draftQuizTitle, saveDraft, clearDraft, hasDraft } =
        useQuizDraft();

    const handleAddQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            { question: "", answers: ["", "", "", ""] },
        ]);
    };

    const handleDeleteQuestion = (index: number) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index: number, questionText: string) => {
        setQuestions((prev) => {
            const newQuestions = [...prev];
            newQuestions[index] = { ...newQuestions[index], question: questionText };
            return newQuestions;
        });
    };

    const handleAnswerChange = (
        questionIndex: number,
        answerIndex: number,
        answerText: string
    ) => {
        setQuestions((prev) => {
            const newQuestions = [...prev];
            newQuestions[questionIndex].answers[answerIndex] = answerText;
            return newQuestions;
        });
    };

    const validateQuiz = () => {
        if (questions.length === 0) return false;

        return questions.some(
            (q) =>
                q.question.trim() !== "" &&
                q.answers.filter((a) => a.trim() !== "").length >= 2
        );
    };

    const handleSaveQuiz = () => {
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
        setQuestions([]);
        closeDialog();
    };

    const handleSaveDraft = () => {
        saveDraft(questions, quizTitle);
        toast.success("Draft Saved", {
            description: "Your quiz draft has been saved.",
        });
        closeSaveDraftDialog();
        closeDialog();
    };

    const handleDiscardDraft = () => {
        clearDraft();
        setQuestions([]);
        setQuizTitle("");
        closeSaveDraftDialog();
        closeDialog();
    };

    const hasUnsavedChanges = () => {
        return (
            questions.some((q) => q.question || q.answers.some((a) => a)) ||
            quizTitle.trim() !== ""
        );
    };

    const handleBackToMethodSelect = () => {
        if (hasUnsavedChanges()) {
            openSaveDraftDialog();
        } else {
            closeDialog();
            openCreateMethodDialog();
        }
    };

    const handleOpenDialog = () => {
        if (hasDraft) {
            setQuestions(draftQuestions);
            setQuizTitle(draftQuizTitle);
            openDialog();
        } else {
            openCreateMethodDialog();
        }
    };

    const handleCloseDialog = (open: boolean) => {
        if (!open && hasUnsavedChanges()) {
            openSaveDraftDialog();
        } else {
            setIsDialogOpen(open);
        }
    };

    const handleCancelSaveDraft = () => {
        closeSaveDraftDialog();
        openDialog();
    };

    const parseTxtFile = (
        content: string
    ): { title: string; questions: Question[] } => {
        try {
            const parts = content
                .split(";")
                .map((part) => part.trim())
                .filter((part) => part);
            if (parts.length < 2) {
                throw new Error(
                    "File must contain at least a title and one question"
                );
            }

            const title = parts[0] || "New Quiz";
            const questions = parts.slice(1);

            const parsedQuestions = questions.map((questionStr) => {
                const parts = questionStr.split(",").map((p) => p.trim());
                if (parts.length < 3) {
                    throw new Error(`Invalid question format: ${questionStr}`);
                }

                const question = parts[0];
                const correctAnswerIndex = parseInt(parts[1]) - 1;
                const answers = parts.slice(2, 6);

                if (correctAnswerIndex < 0 || correctAnswerIndex >= answers.length) {
                    throw new Error(
                        `Invalid correct answer index in question: ${question}`
                    );
                }

                while (answers.length < 4) {
                    answers.push("");
                }

                return {
                    question,
                    answers,
                    correctAnswerIndex,
                };
            });

            return {
                title,
                questions: parsedQuestions,
            };
        } catch (error) {
            throw new Error(
                `Failed to parse TXT file: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    const parseJsonFile = (
        content: QuizFile
    ): { title: string; questions: Question[] } => {
        try {
            return {
                title: content.title || "New Quiz",
                questions: content.questions.map((q) => ({
                    question: q.question,
                    answers: q.answers.map((a) => a.text),
                    correctAnswerIndex: q.answers.findIndex((a) => a.isCorrect),
                })),
            };
        } catch (error) {
            throw new Error(
                `Failed to parse JSON file: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                let parsedData: { title: string; questions: Question[] };

                if (file.name.toLowerCase().endsWith(".json")) {
                    const jsonContent = JSON.parse(content) as QuizFile;
                    parsedData = parseJsonFile(jsonContent);
                } else if (file.name.toLowerCase().endsWith(".txt")) {
                    parsedData = parseTxtFile(content);
                } else {
                    throw new Error(
                        "Unsupported file format. Please use .txt or .json"
                    );
                }

                if (parsedData.questions.length === 0) {
                    throw new Error("No valid questions found in the file");
                }

                setQuestions(
                    parsedData.questions.map((q) => ({
                        question: q.question,
                        answers: q.answers,
                    }))
                );
                setQuizTitle(parsedData.title);
                closeCreateMethodDialog();
                openDialog();

                toast.success("File loaded successfully", {
                    description: `Loaded ${parsedData.questions.length} questions`,
                });
            } catch (error: unknown) {
                toast.error("Error reading file", {
                    description:
                        error instanceof Error ? error.message : "Unknown error",
                });
            }
        };
        reader.readAsText(file);
    };

    const handleManualCreate = (count: number) => {
        const validCount = Math.min(Math.max(1, count), 200);
        setQuestions(
            Array.from({ length: validCount }, () => ({
                question: "",
                answers: ["", "", "", ""],
            }))
        );
        closeCreateMethodDialog();
        openDialog();
    };

    return (
        <div className="relative min-h-screen">
            <BackgroundSection
                color="bg-primary-light"
                position="left"
            />
            <div className="container mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">Quiz Menu</h1>
                    <Button
                        className="flex items-center gap-2"
                        onClick={handleOpenDialog}
                    >
                        <Plus className="w-4 h-4" />
                        Create New Quiz
                    </Button>

                    <CreateMethodDialog
                        open={isCreateMethodDialogOpen}
                        onOpenChange={setShowCreateMethodDialog}
                        onFileSelect={handleFileSelect}
                        onManualCreate={handleManualCreate}
                    />

                    <QuizCreationDialog
                        open={isDialogOpen}
                        onOpenChange={handleCloseDialog}
                        quizTitle={quizTitle}
                        setQuizTitle={setQuizTitle}
                        questions={questions}
                        setQuestions={setQuestions}
                        onAddQuestion={handleAddQuestion}
                        onDeleteQuestion={handleDeleteQuestion}
                        onQuestionChange={handleQuestionChange}
                        onAnswerChange={handleAnswerChange}
                        onSaveQuiz={handleSaveQuiz}
                        onBackToMethodSelect={handleBackToMethodSelect}
                    />
                </div>

                <SaveDraftDialog
                    open={isSaveDraftDialogOpen}
                    onOpenChange={setShowSaveDraftDialog}
                    onSaveDraft={handleSaveDraft}
                    onDiscardDraft={handleDiscardDraft}
                    onCancel={handleCancelSaveDraft}
                />
            </div>
        </div>
    );
};

export default QuizMenu;
