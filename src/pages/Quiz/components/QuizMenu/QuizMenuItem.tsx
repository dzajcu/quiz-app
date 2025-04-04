import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Rainbow } from "lucide-react";
import { useIsMedium } from "@/hooks/use-medium";

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
    const isMedium = useIsMedium();
    return (
        <Card
            className="p-4 max-lg:h-40 max-lg:min-w-52 relative flex items-center bg-primary-button overflow-hidden border-none hover:brightness-110 transition-all cursor-pointer select-none"
            onClick={() => onQuizSelect && id && onQuizSelect(title, id)}
        >
            <CardHeader className="p-0">
                <Rainbow className="inline-block size-10 text-white" />
            </CardHeader>
            <CardContent className="ml-6 flex max-lg:flex-col p-0 lg:items-center justify-between w-full max-lg:gap-1">
                <CardTitle className="text-lg text-white">{title}</CardTitle>
                <p className="text-xs text-white italic">{description}</p>
            </CardContent>

            <div className="h-32 w-32 bg-white opacity-30 rounded-full absolute right-[-22px] bottom-[-40px]"></div>
            {isMedium && (
                <div className="h-32 w-32 bg-white opacity-30 rounded-full absolute right-[-60px] top-[-30px]"></div>
            )}
        </Card>
    );
};

export default QuizMenuCard;
