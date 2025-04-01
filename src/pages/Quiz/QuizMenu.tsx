import QuizCreationButton from "./components/QuizCreation/QuizCreationButton";
import BackgroundLayout from "../../components/BackgroundLayout";
import QuizMenuCard from "./components/QuizMenu/QuizMenuCard";
import quizData from "../../data/quizData.json";
import { useState, useEffect } from "react";
import QuizMenuOptions from "./components/QuizMenu/QuizMenuOptions";

interface Quiz {
    id: string;
    title: string;
    description: string;
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

    const leftSection = (
        <div className="flex flex-col h-full w-full overflow-auto no-scrollbar p-14">
            <h2 className="text-2xl font-bold pb-4 text-right">Your Quizes</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 justify-items-center">
                <QuizCreationButton />
                {quizzes.map((quiz) => (
                    <QuizMenuCard
                        key={quiz.id}
                        id={quiz.id}
                        title={quiz.title}
                        description={`${quiz.questions.length} questions`}
                        onQuizSelect={handleQuizSelect}
                    />
                ))}
            </div>
        </div>
    );

    const rightSection = (
        <div className="flex flex-col h-full w-full overflow-auto no-scrollbar p-14">
            <h2 className="text-2xl font-bold pb-4">Popular Quizzes</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 justify-items-center">
                {quizzes.map((quiz) => (
                    <QuizMenuCard
                        key={quiz.id}
                        title={quiz.title}
                        description={`${quiz.questions.length} questions`}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <>
            <BackgroundLayout
                leftSection={leftSection}
                rightSection={rightSection}
                sectionPadding="p-[0]"
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
