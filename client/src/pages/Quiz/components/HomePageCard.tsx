import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Rainbow } from "lucide-react";

interface QuizMenuCardProps {
    title?: string;
    description?: string;
    onQuizSelect?: (title: string, id: string) => void;
    id?: string;
}

const QuizMenuCard = ({
    title = "Quiz Mode",
    description = "Start a new quiz",
    onQuizSelect,
    id,
}: QuizMenuCardProps) => {
    return (
        <Card
            className="relative w-full h-full flex flex-col justify-between bg-primary-button overflow-hidden border-none hover:brightness-110 transition-all cursor-pointer group"
            onClick={() => onQuizSelect && id && onQuizSelect(title, id)}
        >
            <CardHeader className="py-0 flex-none">
                <Rainbow className="inline-block mr-2 size-16 text-white transform group-hover:rotate-12 transition-transform" />
            </CardHeader>
            <CardContent className="py-2 z-10 flex-grow">
                <CardTitle className="text-xl text-white mb-2">{title}</CardTitle>
                <p className="text-sm text-white/80">{description}</p>
            </CardContent>
            <div className="h-48 w-48 bg-white opacity-20 rounded-full absolute right-[-32px] bottom-[-60px] transform group-hover:scale-110 transition-transform"></div>
            <div className="h-48 w-48 bg-white opacity-20 rounded-full absolute right-[-80px] top-[-40px] transform group-hover:scale-110 transition-transform"></div>
        </Card>
    );
};

export default QuizMenuCard;
