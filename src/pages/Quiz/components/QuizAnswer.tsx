import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface QuizAnswerProps {
    answer: string;
    value: string;
}

const QuizAnswer = ({ answer, value }: QuizAnswerProps) => {
    return (
        <div className="relative">
            <RadioGroupItem
                className="peer sr-only"
                value={value}
                id={value}
            />
            <div className="flex items-center rounded-lg border-2 m-auto border-primary-muted peer-data-[state=checked]:bg-primary-button peer-data-[state=checked]:border-primary-button peer-data-[state=checked]:text-white transition hover:translate-x-5">
                <Label
                    htmlFor={value}
                    className="cursor-pointer w-full p-4 text-md"
                >
                    {answer}
                </Label>
            </div>
        </div>
    );
};

export default QuizAnswer;
