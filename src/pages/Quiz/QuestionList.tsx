// components/QuizMenu/QuestionList.tsx
import { Question } from "@/types/quiz";
import QuestionItem from "./QuestionItem";

interface QuestionListProps {
    questions: Question[];
    onQuestionChange: (index: number, questionText: string) => void;
    onAnswerChange: (index: number, answerIndex: number, answerText: string) => void;
    onDeleteQuestion: (index: number) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    onQuestionChange,
    onAnswerChange,
    onDeleteQuestion,
}) => {
    return (
        <div className="space-y-6">
            {questions.map((question, index) => (
                <QuestionItem
                    key={index}
                    index={index}
                    question={question}
                    onQuestionChange={(questionText) =>
                        onQuestionChange(index, questionText)
                    }
                    onAnswerChange={(answerIndex, answerText) =>
                        onAnswerChange(index, answerIndex, answerText)
                    }
                    onDelete={() => onDeleteQuestion(index)}
                />
            ))}
        </div>
    );
};

export default QuestionList;
