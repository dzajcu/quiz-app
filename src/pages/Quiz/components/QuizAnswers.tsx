import { RadioGroup } from "@/components/ui/radio-group";
import QuizAnswer from "./QuizAnswer";

interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface QuizAnswersProps {
    answers: Answer[];
    selectedValue: string;
    onAnswerSelect: (value: string) => void;
}

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
