import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Rainbow } from "lucide-react";

interface QuizMenuCardProps {
    title: string;
    description: string;
    onQuizSelect?: (title: string, id: string) => void;
    id?: string;
}

const QuizMenuCard = ({
    title,
    description,
    onQuizSelect,
    id,
}: QuizMenuCardProps) => {
    return (
        <Card
            className="relative w-72 max-w-xs h-36 flex flex-col justify-between bg-primary-button overflow-hidden border-none hover:brightness-110 transition-all cursor-pointer"
            onClick={() => onQuizSelect && id && onQuizSelect(title, id)}
        >
            <CardHeader className="py-0">
                <Rainbow className="inline-block mr-2 size-16 text-white" />
            </CardHeader>
            <CardContent className="py-2">
                <CardTitle className="text-xl text-white">{title}</CardTitle>
            </CardContent>
            <CardFooter className="py-2 text-sm text-white">
                {description}
            </CardFooter>
            <div className="h-32 w-32 bg-white opacity-30 rounded-full absolute right-[-22px] bottom-[-40px]"></div>
            <div className="h-32 w-32 bg-white opacity-30 rounded-full absolute right-[-60px] top-[-30px]"></div>
        </Card>
    );
};

export default QuizMenuCard;
