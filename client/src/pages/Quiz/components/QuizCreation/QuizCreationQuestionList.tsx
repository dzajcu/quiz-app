import { QuestionListProps } from "@/types/quiz";
import QuizCreationQuestionItem from "./QuizCreationQuestionItem";

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    onQuestionChange,
    onAnswerChange,
    onCorrectAnswerChange,
    onDeleteQuestion,
}) => {
    return (
        <div className="space-y-6">
            {questions.map((question, index) => (
                <QuizCreationQuestionItem
                    key={index}
                    index={index}
                    question={question}
                    onQuestionChange={(questionText) =>
                        onQuestionChange(index, questionText)
                    }
                    onAnswerChange={(answerIndex, answerText) =>
                        onAnswerChange(index, answerIndex, answerText)
                    }
                    onCorrectAnswerChange={
                        onCorrectAnswerChange
                            ? (correctAnswerIndex) =>
                                  onCorrectAnswerChange(index, correctAnswerIndex)
                            : undefined
                    }
                    onDelete={() => onDeleteQuestion(index)}
                />
            ))}
        </div>
    );
};

export default QuestionList;
