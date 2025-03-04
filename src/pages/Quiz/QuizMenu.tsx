import BackgroundSection from "@/components/ui/background-section";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import QuestionCollapsible from "@/components/QuestionCollapsible";
import { toast } from "sonner";
import quizData from "@/data/quizData.json";
import InputFile from "@/components/ui/input-file";
import { QuizFile } from "@/types/quiz";

interface Question {
    question: string;
    answers: string[];
}

const QuizMenu = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showSaveDraftDialog, setShowSaveDraftDialog] = useState(false);
    const [showCreateMethodDialog, setShowCreateMethodDialog] = useState(false);
    const [initialQuestionCount, setInitialQuestionCount] = useState<number>(1);

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

        // Format questions to match quizData.json structure
        const formattedQuestions = questions.map((q, qIndex) => ({
            id: quizData.questions.length + qIndex + 1,
            question: q.question,
            answers: q.answers.map((text, index) => ({
                id: String.fromCharCode(97 + index), // a, b, c, d
                text,
                isCorrect: index === 0, // temporarily setting first answer as correct
            })),
        }));

        // Here you would typically make an API call to save the data
        console.log("Saving quiz with questions:", formattedQuestions);
        toast.success("Success", {
            description: "Quiz has been created successfully!",
        });

        // Clear draft and close dialog
        localStorage.removeItem("quizDraft");
        setQuestions([]);
        setIsDialogOpen(false);
    };

    const handleSaveDraft = () => {
        localStorage.setItem("quizDraft", JSON.stringify(questions));
        toast.success("Draft Saved", {
            description: "Your quiz draft has been saved.",
        });
        setShowSaveDraftDialog(false);
        setIsDialogOpen(false);
    };

    const handleDiscardDraft = () => {
        localStorage.removeItem("quizDraft");
        setQuestions([]);
        setShowSaveDraftDialog(false);
        setIsDialogOpen(false);
    };

    const handleOpenDialog = () => {
        const savedDraft = localStorage.getItem("quizDraft");
        if (savedDraft) {
            setQuestions(JSON.parse(savedDraft));
            setIsDialogOpen(true);
        } else {
            setShowCreateMethodDialog(true);
        }
    };

    const handleCloseDialog = (open: boolean) => {
        if (!open && questions.some((q) => q.question || q.answers.some((a) => a))) {
            setShowSaveDraftDialog(true);
        } else {
            setIsDialogOpen(open);
        }
    };

    const handleCancelSaveDraft = () => {
        setShowSaveDraftDialog(false);
        setIsDialogOpen(true);
    };

    const parseTxtFile = (content: string): Question[] => {
        try {
            const questions = content.split(";").filter((q) => q.trim());
            return questions.map((questionStr) => {
                const parts = questionStr.split(",").map((p) => p.trim());
                if (parts.length < 3) {
                    throw new Error(`Invalid question format: ${questionStr}`);
                }

                const question = parts[0];
                const correctAnswerIndex = parseInt(parts[1]) - 1; // Convert to 0-based index
                const answers = parts.slice(2, 6); // Take up to 4 answers

                if (correctAnswerIndex < 0 || correctAnswerIndex >= answers.length) {
                    throw new Error(
                        `Invalid correct answer index in question: ${question}`
                    );
                }

                // Ensure we always have exactly 4 answers
                while (answers.length < 4) {
                    answers.push("");
                }

                return {
                    question,
                    answers,
                    correctAnswerIndex,
                };
            });
        } catch (error) {
            throw new Error(
                `Failed to parse TXT file: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    const parseJsonFile = (content: QuizFile): Question[] => {
        try {
            return content.questions.map((q) => ({
                question: q.question,
                answers: q.answers.map((a) => a.text),
                correctAnswerIndex: q.answers.findIndex((a) => a.isCorrect),
            }));
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
                let parsedQuestions: Question[];

                if (file.name.toLowerCase().endsWith(".json")) {
                    const jsonContent = JSON.parse(content) as QuizFile;
                    parsedQuestions = parseJsonFile(jsonContent);
                } else if (file.name.toLowerCase().endsWith(".txt")) {
                    parsedQuestions = parseTxtFile(content);
                } else {
                    throw new Error(
                        "Unsupported file format. Please use .txt or .json"
                    );
                }

                if (parsedQuestions.length === 0) {
                    throw new Error("No valid questions found in the file");
                }

                setQuestions(
                    parsedQuestions.map((q) => ({
                        question: q.question,
                        answers: q.answers,
                    }))
                );
                setShowCreateMethodDialog(false);
                setIsDialogOpen(true);

                toast.success("File loaded successfully", {
                    description: `Loaded ${parsedQuestions.length} questions`,
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

    const handleManualCreate = () => {
        const count = Math.min(Math.max(1, initialQuestionCount), 200);
        setQuestions(
            Array.from({ length: count }, () => ({
                question: "",
                answers: ["", "", "", ""],
            }))
        );
        setShowCreateMethodDialog(false);
        setIsDialogOpen(true);
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

                    <Dialog
                        open={showCreateMethodDialog}
                        onOpenChange={setShowCreateMethodDialog}
                    >
                        <DialogContent className="sm:max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Create New Quiz</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 mt-4 items-center">
                                {/* Manual Creation Tile */}
                                <div className="flex flex-col p-6 space-y-4 border-1 border-gray-300 rounded-xl hover:border-primary shadow-lg transition-all duration-300 items-center justify-center">
                                    <h3 className="text-lg font-semibold text-primary">
                                        Create Manually
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">
                                                Enter the number of questions (1-200)
                                            </p>
                                            <Input
                                                type="number"
                                                min="1"
                                                max="200"
                                                value={initialQuestionCount}
                                                onChange={(e) =>
                                                    setInitialQuestionCount(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-full"
                                                placeholder="Number of questions"
                                            />
                                        </div>
                                        <Button
                                            className="w-full"
                                            onClick={handleManualCreate}
                                        >
                                            Start Creating
                                        </Button>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-px h-6 bg-gray-300"></div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        OR
                                    </span>
                                    <div className="w-px h-6 bg-gray-300"></div>
                                </div>

                                {/* File Upload Tile */}
                                <div className="flex flex-col h-full">
                                    <InputFile onFileSelect={handleFileSelect} />
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={isDialogOpen}
                        onOpenChange={handleCloseDialog}
                    >
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Create New Quiz</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                                {questions.map((question, index) => (
                                    <div
                                        key={index}
                                        className="flex relative "
                                    >
                                        <QuestionCollapsible
                                            questionNumber={index + 1}
                                            initialQuestion={question.question}
                                            initialAnswers={question.answers}
                                            onQuestionChange={(question) =>
                                                handleQuestionChange(index, question)
                                            }
                                            onAnswerChange={(answerIndex, answer) =>
                                                handleAnswerChange(
                                                    index,
                                                    answerIndex,
                                                    answer
                                                )
                                            }
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute -right-4 top-[2px] h-8 w-8 hover:text-red-500"
                                            onClick={() =>
                                                handleDeleteQuestion(index)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={handleAddQuestion}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Question
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onClick={handleSaveQuiz}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Create Quiz
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <AlertDialog
                    open={showSaveDraftDialog}
                    onOpenChange={setShowSaveDraftDialog}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Save Draft?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Would you like to save your quiz as a draft? You can
                                continue editing it later.
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
            </div>
        </div>
    );
};

export default QuizMenu;
