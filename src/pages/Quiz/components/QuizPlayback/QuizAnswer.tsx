import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { QuizAnswerProps } from "@/types/quiz";

const QuizAnswer = ({ answer, value }: QuizAnswerProps) => {
    return (
        <div className="relative">
            <RadioGroupItem
                className="peer sr-only"
                value={value}
                id={value}
            />
            <div className="flex items-center rounded-lg border-2 m-auto border-primary-muted peer-data-[state=checked]:bg-primary-button peer-data-[state=checked]:border-primary-button peer-data-[state=checked]:text-white transition hover:translate-x-5 max-md:hover:translate-x-3">
                <Label
                    htmlFor={value}
                    className="cursor-pointer w-full p-4 max-md:p-3 text-base max-md:text-sm"
                >
                    {answer}
                </Label>
            </div>
        </div>
    );
};

export default QuizAnswer;
