import { ChevronDown } from "lucide-react";
import { InputQuiz } from "@/components/ui/input-quiz";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { QuestionCollapsibleProps } from "@/types/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const QuestionCollapsible = ({
    questionNumber,
    initialQuestion = "",
    initialAnswers = ["", "", "", ""],
    initialCorrectAnswerIndex = 0,
    onQuestionChange,
    onAnswerChange,
    onCorrectAnswerChange,
}: QuestionCollapsibleProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState(initialQuestion);
    const [answers, setAnswers] = useState(initialAnswers);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
        initialCorrectAnswerIndex
    );
    useEffect(() => {
        setQuestion(initialQuestion);
        setAnswers(initialAnswers);
        setCorrectAnswerIndex(
            typeof initialCorrectAnswerIndex === "number"
                ? initialCorrectAnswerIndex
                : 0
        );
    }, [initialQuestion, initialAnswers, initialCorrectAnswerIndex]);

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

    const handleCorrectAnswerChange = (value: string) => {
        const index = parseInt(value);
        setCorrectAnswerIndex(index);
        if (onCorrectAnswerChange) {
            onCorrectAnswerChange(index);
        }
    };

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
        >
            <div className="flex items-center justify-between space-x-4 pl-4 pr-1">
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
                    <RadioGroup
                        value={correctAnswerIndex.toString()}
                        onValueChange={handleCorrectAnswerChange}
                        className="space-y-2"
                    >
                        {answers.map((answer, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 group"
                            >
                                <RadioGroupItem
                                    value={index.toString()}
                                    id={`answer-${questionNumber}-${index}`}
                                    className="hidden peer"
                                />{" "}
                                <label
                                    htmlFor={`answer-${questionNumber}-${index}`}
                                    className="cursor-pointer px-2 py-1 rounded-md hover:bg-accent transition-colors"
                                >
                                    <span
                                        className={`text-sm transition-colors ${
                                            correctAnswerIndex === index
                                                ? "text-primary font-medium"
                                                : "text-gray-500 group-hover:text-gray-700"
                                        }`}
                                    >
                                        {String.fromCharCode(65 + index)}.
                                    </span>
                                </label>
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
                    </RadioGroup>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default QuestionCollapsible;
