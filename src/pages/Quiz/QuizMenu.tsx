import QuizCreationButton from "./components/QuizCreation/QuizCreationButton";
import BackgroundLayout from "../../components/BackgroundLayout";
import QuizMenuItem from "./components/QuizMenu/QuizMenuItem";
import quizData from "../../data/quizData.json";
import { useState, useEffect } from "react";
import QuizMenuOptions from "./components/QuizMenu/QuizMenuOptions";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMedium } from "@/hooks/use-medium";

interface Quiz {
    id: string;
    title: string;
    questions: {
        id: number;
        question: string;
        answers: { id: string; text: string; isCorrect: boolean }[];
    }[];
}

const QuizMenu = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<{
        id: string;
        title: string;
    } | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const allQuizzes = quizData.quizzes;
        setQuizzes(allQuizzes);
    }, []);

    const handleQuizSelect = (title: string, id: string) => {
        setSelectedQuiz({ id, title });
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedQuiz(null);
    };

    const isMedium = useIsMedium();

    const leftSection = (
        <div className="flex flex-col h-full py-14">
            <h2 className="text-2xl font-bold pb-4 text-center max-lg:mb-12">
                Your Quizzes
            </h2>
            {/* <QuizCreationButton/> */}
            <Carousel
                className="w-full max-md:max-w-screen-sm justify-center lg:m-auto"
                orientation={isMedium ? "horizontal" : "vertical"}
            >
                <CarouselContent className="max-h-[62vh] lg:max-w-lg max-lg:max-w-[100vw] m-auto">
                    {quizzes.map((quiz) => (
                        <CarouselItem
                            className="basis-1/2"
                            key={quiz.id}
                        >
                            <QuizMenuItem
                                key={quiz.id}
                                id={quiz.id}
                                title={quiz.title}
                                description={`${quiz.questions.length} questions`}
                                onQuizSelect={handleQuizSelect}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="max-lg:hidden" />
                <CarouselNext className="max-lg:hidden" />
            </Carousel>
        </div>
    );

    const rightSection = (
        <div className="flex flex-col h-full py-14">
            <h2 className="text-2xl font-bold pb-4 text-center max-lg:mb-12">
                Popular Quizzes
            </h2>
            <Carousel
                className="w-full max-md:max-w-screen-sm justify-center lg:m-auto"
                orientation={isMedium ? "horizontal" : "vertical"}
            >
                <CarouselContent className="max-h-[62vh] lg:max-w-lg max-lg:max-w-[100vw] m-auto">
                    {quizzes.map((quiz) => (
                        <CarouselItem
                            className="basis-1/2"
                            key={quiz.id}
                        >
                            <QuizMenuItem
                                key={quiz.id}
                                id={quiz.id}
                                title={quiz.title}
                                description={`${quiz.questions.length} questions`}
                                onQuizSelect={handleQuizSelect}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="max-lg:hidden" />
                <CarouselNext className="max-lg:hidden" />
            </Carousel>
        </div>
    );

    return (
        <>
            <BackgroundLayout
                leftSection={leftSection}
                rightSection={rightSection}
                isWrapper={false}
            />
            {selectedQuiz && (
                <QuizMenuOptions
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                    quizTitle={selectedQuiz.title}
                    quizId={selectedQuiz.id}
                />
            )}
        </>
    );
};

export default QuizMenu;
