import QuizCreationQuestionCollapsible from "./QuizCreationQuestionCollapsible";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { QuestionItemProps } from "@/types/quiz";

const QuestionItem: React.FC<QuestionItemProps> = ({
    question,
    index,
    onQuestionChange,
    onAnswerChange,
    onDelete,
}) => {
    return (
        <div className="flex relative gap-0">
            <QuizCreationQuestionCollapsible
                questionNumber={index + 1}
                initialQuestion={question.question}
                initialAnswers={question.answers}
                onQuestionChange={onQuestionChange}
                onAnswerChange={onAnswerChange}
            />
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-red-500"
                onClick={onDelete}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default QuestionItem;
