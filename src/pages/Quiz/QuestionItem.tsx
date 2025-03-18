// components/QuizMenu/QuestionItem.tsx
import QuestionCollapsible from "@/components/QuestionCollapsible";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Question } from "@/types/quiz";

interface QuestionItemProps {
    question: Question;
    index: number;
    onQuestionChange: (questionText: string) => void;
    onAnswerChange: (answerIndex: number, answerText: string) => void;
    onDelete: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
    question,
    index,
    onQuestionChange,
    onAnswerChange,
    onDelete,
}) => {
    return (
        <div className="flex relative ">
            <QuestionCollapsible
                questionNumber={index + 1}
                initialQuestion={question.question}
                initialAnswers={question.answers}
                onQuestionChange={onQuestionChange}
                onAnswerChange={onAnswerChange}
            />
            <Button
                variant="ghost"
                size="icon"
                className="absolute -right-4 top-[2px] h-8 w-8 hover:text-red-500"
                onClick={onDelete}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default QuestionItem;
