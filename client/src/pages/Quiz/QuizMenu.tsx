import QuizCreationButton from "./components/QuizCreation/QuizCreationButton";
import BackgroundLayout from "../../components/BackgroundLayout";
import QuizMenuItem from "./components/QuizMenu/QuizMenuItem";
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
import { quizService } from "@/services/quiz.service";
import { Quiz } from "@/types/quiz";

const QuizMenu = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>();
    const [myQuizzes, setMyQuizzes] = useState<Quiz[]>();
    const [selectedQuiz, setSelectedQuiz] = useState<{
        id: string;
        title: string;
    } | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const publicQuizzes = await quizService.getAllPublicQuizzes();
                setQuizzes(publicQuizzes.quizzes);
                try {
                    const myQuizzes = await quizService.getMyQuizzes();
                    setMyQuizzes(myQuizzes.quizzes);
                } catch (error) {
                    console.log("User is probably not logged in:", error);
                }
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
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
        <div className="flex flex-col h-full md:py-14">
            <h2 className="text-2xl font-bold pb-4 text-center max-lg:mb-12">
                Your Quizzes
            </h2>

            <Carousel
                className="w-full justify-center lg:m-auto"
                orientation={isMedium ? "horizontal" : "vertical"}
            >
                <CarouselContent className="max-h-[62vh] lg:max-w-lg lg:m-auto">
                    <CarouselItem className="basis-1/2">
                        <QuizCreationButton />
                    </CarouselItem>
                    {myQuizzes?.map((quiz) => (
                        <CarouselItem
                            className="basis-1/2"
                            key={quiz._id}
                        >
                            <QuizMenuItem
                                key={quiz._id}
                                id={quiz._id}
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
        <div className="flex flex-col h-full md:py-14">
            <h2 className="text-2xl font-bold pb-4 text-center max-lg:mb-12">
                Public Quizzes
            </h2>
            <Carousel
                className="w-full justify-center lg:m-auto"
                orientation={isMedium ? "horizontal" : "vertical"}
            >
                <CarouselContent className="max-h-[62vh] lg:max-w-lg lg:m-auto">
                    {quizzes?.map((quiz) => (
                        <CarouselItem
                            className="basis-1/2"
                            key={quiz._id}
                        >
                            <QuizMenuItem
                                key={quiz._id}
                                id={quiz._id}
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
