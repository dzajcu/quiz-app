import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputQuiz } from "@/components/ui/input-quiz";
import { Save, ArrowLeft, Plus } from "lucide-react";
import QuizQuestionList from "./QuizCreationQuestionList";
import { useQuiz } from "@/contexts/QuizContext";

const QuizCreationDialog = () => {
    const {
        isQuizDialogOpen,
        handleCloseQuizDialog,
        quizTitle,
        setQuizTitle,
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
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader className="space-y-4">
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
                    </div>
                </DialogHeader>
                <QuizQuestionList
                    questions={questions}
                    onQuestionChange={handleQuestionChange}
                    onAnswerChange={handleAnswerChange}
                    onDeleteQuestion={handleDeleteQuestion}
                />
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
