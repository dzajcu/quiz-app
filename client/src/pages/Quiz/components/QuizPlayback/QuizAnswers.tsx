import { RadioGroup } from "@/components/ui/radio-group";
import QuizAnswer from "./QuizAnswer";
import { QuizAnswersProps } from "@/types/quiz";

const QuizAnswers = ({
    answers,
    selectedValue,
    onAnswerSelect,
}: QuizAnswersProps) => {
    return (
        <RadioGroup
            value={selectedValue}
            onValueChange={onAnswerSelect}
            className="space-y-4"
        >
            {answers.map((answer) => (
                <QuizAnswer
                    key={answer.id}
                    answer={answer.text}
                    value={answer.id}
                />
            ))}
        </RadioGroup>
    );
};

export default QuizAnswers;
