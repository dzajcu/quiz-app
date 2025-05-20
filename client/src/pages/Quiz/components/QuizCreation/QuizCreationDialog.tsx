import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputQuiz } from "@/components/ui/input-quiz";
import { Save, ArrowLeft, Plus, Globe, Lock } from "lucide-react";
import QuizQuestionList from "./QuizCreationQuestionList";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQuiz } from "@/contexts/QuizContext";
import { IconPicker, Icon } from "@/components/ui/icon-picker";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const QuizCreationDialog = () => {
    const {
        isQuizDialogOpen,
        handleCloseQuizDialog,
        quizTitle,
        setQuizTitle,
        quizDescription,
        setQuizDescription,
        quizIcon,
        setQuizIcon,
        isPublic,
        setIsPublic,
        questions,
        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
        handleCorrectAnswerChange,
        handleSaveQuiz,
        handleBackToMethodSelect,
    } = useQuiz();

    const [showErrors, setShowErrors] = useState(false);

    const validateQuiz = () => {
        const errors: string[] = [];

        if (!quizTitle?.trim()) {
            errors.push("Quiz title");
        }
        if (quizTitle.length < 3) {
            errors.push("Quiz title with at least 3 characters");
        }
        if (!quizIcon) {
            errors.push("Quiz icon");
        }

        const hasValidQuestion = questions.some(
            (q) =>
                q.question?.trim() && q.answers?.filter((a) => a?.trim()).length >= 2
        );
        const hasValidCorrectAnswer = questions.some(
            (q) => q.answers[q.correctAnswerIndex]?.length > 0
        );

        if (!hasValidQuestion) {
            errors.push("At least one question with two answers");
        }
        if (!hasValidCorrectAnswer) {
            errors.push("At least one correct answer for each question");
        }

        return errors;
    };

    useEffect(() => {
        if (!isQuizDialogOpen) {
            setShowErrors(false);
        }
    }, [isQuizDialogOpen]);

    return (
        <Dialog
            open={isQuizDialogOpen}
            onOpenChange={handleCloseQuizDialog}
        >
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto max-md:py-4 max-md:px-3">
                <DialogHeader className="space-y-4 overflow-visible">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleBackToMethodSelect}
                            className="h-8 w-8 hover:bg-accent"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 flex-1">
                            {" "}
                            <span className="text-lg font-semibold">Create</span>
                            <InputQuiz
                                value={quizTitle}
                                onChange={(e) => setQuizTitle(e.target.value)}
                                placeholder="New Quiz"
                                className={`text-lg font-semibold pl-0 ${
                                    showErrors && quizTitle?.trim().length < 3
                                        ? "border-red-500 focus-visible:border-red-500"
                                        : ""
                                }`}
                                autoFocus
                            />
                        </div>
                        <div className="flex items-center md:pl-4">
                            {" "}
                            <IconPicker
                                className={`p-2 md:mr-6 ${
                                    quizIcon ? "h-10 w-10" : ""
                                }`}
                                value={quizIcon}
                                onValueChange={(icon) => setQuizIcon(icon)}
                                searchable={false}
                            >
                                <Button
                                    variant={"ghost"}
                                    className={`flex items-center gap-2 [&>*]:!w-7 [&>*]:!h-7 ${
                                        showErrors && !quizIcon
                                            ? "border border-red-500"
                                            : ""
                                    }`}
                                >
                                    {quizIcon ? (
                                        <Icon name={quizIcon} />
                                    ) : (
                                        "Select Icon"
                                    )}
                                </Button>
                            </IconPicker>
                            <div className="flex space-x-2 mr-6">
                                <Label
                                    htmlFor="public-mode"
                                    className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-accent transition"
                                >
                                    {isPublic ? (
                                        <>
                                            <Globe className="h-4 w-4" />
                                            <span>Public</span>
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="h-4 w-4" />
                                            <span>Private</span>
                                        </>
                                    )}
                                </Label>
                                <Switch
                                    id="public-mode"
                                    className="hidden"
                                    checked={isPublic}
                                    onCheckedChange={setIsPublic}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 flex-1 pl-4">
                        <textarea
                            value={quizDescription}
                            onChange={(e) => setQuizDescription(e.target.value)}
                            placeholder="Quiz description..."
                            className="text-sm bg-transparent focus:outline-none focus:ring-0 resize-none overflow-hidden flex h-9 w-full rounded-none border-0 border-b px-3 py-1 shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-primary-button border-muted disabled:cursor-not-allowed disabled:opacity-50"
                            style={{
                                height: "28px",
                                minHeight: "28px",
                            }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = "28px";
                                target.style.height = `${target.scrollHeight}px`;
                            }}
                        />
                    </div>{" "}
                </DialogHeader>{" "}
                <div
                    className={`overflow-hidden ${
                        showErrors &&
                        (!questions.length ||
                            !questions.some(
                                (q) =>
                                    q.question?.trim() &&
                                    q.answers?.filter((a) => a?.trim()).length >= 2
                            ))
                            ? "border border-red-500 rounded-lg p-2"
                            : ""
                    }`}
                >
                    <QuizQuestionList
                        questions={questions}
                        onQuestionChange={handleQuestionChange}
                        onAnswerChange={handleAnswerChange}
                        onCorrectAnswerChange={handleCorrectAnswerChange}
                        onDeleteQuestion={handleDeleteQuestion}
                    />
                </div>
                <div className="flex gap-4 mt-6">
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
                        onClick={() => {
                            const errors = validateQuiz();
                            setShowErrors(true);
                            if (errors.length > 0) {
                                if (errors.length === 1) {
                                    toast.error("Missing Required Fields", {
                                        description: `Please provide ${errors[0].toLowerCase()} before creating the quiz.`,
                                    });
                                } else {
                                    toast.error("Missing Required Fields", {
                                        description: (
                                            <div style={{ whiteSpace: "pre-line" }}>
                                                Please provide:
                                                {errors.map(
                                                    (error) => `\n• ${error}`
                                                )}
                                            </div>
                                        ),
                                    });
                                }
                                return;
                            }
                            setShowErrors(false);
                            handleSaveQuiz();
                        }}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Create Quiz
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QuizCreationDialog;
