import { ChevronDown } from "lucide-react";
import { InputQuiz } from "@/components/ui/input-quiz";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useEffect } from "react";

interface QuestionCollapsibleProps {
    questionNumber: number;
    initialQuestion?: string;
    initialAnswers?: string[];
    onQuestionChange: (question: string) => void;
    onAnswerChange: (answerIndex: number, answer: string) => void;
}

const QuestionCollapsible = ({
    questionNumber,
    initialQuestion = "",
    initialAnswers = ["", "", "", ""],
    onQuestionChange,
    onAnswerChange,
}: QuestionCollapsibleProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState(initialQuestion);
    const [answers, setAnswers] = useState(initialAnswers);

    // Update local state when initial values change
    useEffect(() => {
        setQuestion(initialQuestion);
        setAnswers(initialAnswers);
    }, [initialQuestion, initialAnswers]);

    const handleQuestionChange = (value: string) => {
        setQuestion(value);
        onQuestionChange(value);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        onAnswerChange(index, value);
    };

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
        >
            <div className="flex items-center justify-between space-x-4 px-4">
                <div className="flex-1">
                    <InputQuiz
                        placeholder={`Question ${questionNumber}`}
                        value={question}
                        onChange={(e) => handleQuestionChange(e.target.value)}
                        className="w-full text-sm "
                    />
                </div>
                <CollapsibleTrigger className="p-2 h-full hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300  ${
                            isOpen ? "transform rotate-180" : ""
                        }`}
                    />
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden">
                <div className="px-4 py-2 space-y-2">
                    {answers.map((answer, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <span className="text-sm text-gray-500 w-8">
                                {String.fromCharCode(65 + index)}.
                            </span>
                            <InputQuiz
                                placeholder={`Answer ${index + 1}`}
                                value={answer}
                                onChange={(e) =>
                                    handleAnswerChange(index, e.target.value)
                                }
                                className="flex-1"
                            />
                        </div>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default QuestionCollapsible;
