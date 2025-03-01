import BackgroundSection from "@/components/ui/background-section";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { Plus, Save } from "lucide-react";
import { useState, useEffect } from "react";
import QuestionCollapsible from "@/components/QuestionCollapsible";
import { toast } from "sonner";
import quizData from "@/data/quizData.json";

interface Question {
    question: string;
    answers: string[];
}

const QuizMenu = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showSaveDraftDialog, setShowSaveDraftDialog] = useState(false);

    const loadDraft = () => {
        const savedDraft = localStorage.getItem("quizDraft");
        if (savedDraft) {
            setQuestions(JSON.parse(savedDraft));
        } else {
            setQuestions([{ question: "", answers: ["", "", "", ""] }]);
        }
    };

    // Load draft when component mounts
    useEffect(() => {
        loadDraft();
    }, []);

    const handleAddQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            { question: "", answers: ["", "", "", ""] },
        ]);
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
        const newQuestions = questions.map((q, qIndex) => ({
            id: quizData.questions.length + qIndex + 1,
            question: q.question,
            answers: q.answers.map((text, index) => ({
                id: String.fromCharCode(97 + index), // a, b, c, d
                text,
                isCorrect: index === 0, // temporarily setting first answer as correct
            })),
        }));

        // Here you would typically make an API call to save the data
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
        loadDraft();
        setIsDialogOpen(true);
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

    return (
        <div className="relative min-h-screen">
            <BackgroundSection
                color="bg-primary-light"
                position="left"
            />
            <div className="container mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">Quiz Menu</h1>
                    <Dialog
                        open={isDialogOpen}
                        onOpenChange={handleCloseDialog}
                    >
                        <DialogTrigger asChild>
                            <Button
                                className="flex items-center gap-2"
                                onClick={handleOpenDialog}
                            >
                                <Plus className="w-4 h-4" />
                                Create New Quiz
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Create New Quiz</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                                {questions.map((question, index) => (
                                    <QuestionCollapsible
                                        key={index}
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
    );
};

export default QuizMenu;
