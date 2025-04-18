import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputQuiz } from "@/components/ui/input-quiz";
import { Save, ArrowLeft, Plus } from "lucide-react";
import QuizQuestionList from "./QuizCreationQuestionList";
import { useQuiz } from "@/contexts/QuizContext";
import { IconPicker, IconName, Icon } from "@/components/ui/icon-picker";

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
        questions,
        handleAddQuestion,
        handleDeleteQuestion,
        handleQuestionChange,
        handleAnswerChange,
        handleSaveQuiz,
        handleBackToMethodSelect,
    } = useQuiz();

    return (
        <Dialog
            open={isQuizDialogOpen}
            onOpenChange={handleCloseQuizDialog}
        >
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
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
                            <span className="text-lg font-semibold">Create</span>
                            <InputQuiz
                                value={quizTitle}
                                onChange={(e) => setQuizTitle(e.target.value)}
                                placeholder="New Quiz"
                                className="text-lg font-semibold pl-0"
                                autoFocus
                            />
                        </div>
                        <IconPicker
                            className={`p-2 mr-6 ${quizIcon ? "h-10 w-10" : ""}`}
                            value={quizIcon}
                            onValueChange={(icon) => setQuizIcon(icon)}
                            searchable={false}
                        >
                            <Button
                                variant={"ghost"}
                                className="flex items-center gap-2 [&>*]:!w-7 [&>*]:!h-7"
                            >
                                {quizIcon ? <Icon name={quizIcon} /> : "Select Icon"}
                            </Button>
                        </IconPicker>
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
                    </div>
                </DialogHeader>
                <div className="overflow-hidden">
                    <QuizQuestionList
                        questions={questions}
                        onQuestionChange={handleQuestionChange}
                        onAnswerChange={handleAnswerChange}
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
                        onClick={handleSaveQuiz}
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
