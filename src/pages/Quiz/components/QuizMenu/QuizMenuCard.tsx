import React from "react";
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
}

const QuizMenuCard: React.FC<QuizMenuCardProps> = ({ title, description }) => {
    return (
        <Card className="relative w-80 max-w-xs h-40 flex flex-col justify-between bg-primary overflow-hidden">
            <CardHeader className="py-0">
                <Rainbow className="inline-block mr-2 size-16 text-white" />
            </CardHeader>
            <CardContent className="py-2">
                <CardTitle className="text-xl text-white">{title}</CardTitle>
            </CardContent>
            <CardFooter className="py-2 text-sm text-white">
                {description}
            </CardFooter>
            <div className="h-36 w-36 bg-white opacity-30 rounded-full absolute right-[-22px] bottom-[-40px]"></div>
            <div className="h-36 w-36 bg-white opacity-30 rounded-full absolute right-[-60px] top-[-30px]"></div>
        </Card>
    );
};

export default QuizMenuCard;
