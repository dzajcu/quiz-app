// components/QuizMenu/QuizCreationDialog.tsx
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputQuiz } from "@/components/ui/input-quiz";
import { Save, ArrowLeft, Plus } from "lucide-react";
import { Question } from "@/types/quiz";
import QuestionList from "./QuestionList";

interface QuizCreationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    quizTitle: string;
    setQuizTitle: (title: string) => void;
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
    onAddQuestion: () => void;
    onDeleteQuestion: (index: number) => void;
    onQuestionChange: (index: number, questionText: string) => void;
    onAnswerChange: (index: number, answerIndex: number, answerText: string) => void;
    onSaveQuiz: () => void;
    onBackToMethodSelect: () => void;
}

const QuizCreationDialog: React.FC<QuizCreationDialogProps> = ({
    open,
    onOpenChange,
    quizTitle,
    setQuizTitle,
    questions,
    onAddQuestion,
    onDeleteQuestion,
    onQuestionChange,
    onAnswerChange,
    onSaveQuiz,
    onBackToMethodSelect,
}) => {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onBackToMethodSelect}
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
                <QuestionList
                    questions={questions}
                    onQuestionChange={onQuestionChange}
                    onAnswerChange={onAnswerChange}
                    onDeleteQuestion={onDeleteQuestion}
                />
                <div className="flex gap-4 mt-6">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onAddQuestion}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={onSaveQuiz}
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
