import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import QuizAnswers from "@/pages/Quiz/components/QuizAnswers";
import quizData from "@/data/quizData.json";
import { useState } from "react";

interface UserAnswer {
    questionId: number;
    answerId: string;
}

const QuizPage = () => {
    const { isMobile } = useSidebar();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const currentQuestion = quizData.questions[currentQuestionIndex];

    const handleAnswerSelect = (value: string) => {
        setSelectedAnswer(value);
        setUserAnswers((prev) => {
            const filtered = prev.filter((a) => a.questionId !== currentQuestion.id);
            return [
                ...filtered,
                { questionId: currentQuestion.id, answerId: value },
            ];
        });
    };
    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            const nextQuestionId = quizData.questions[currentQuestionIndex + 1].id;
            const nextAnswer = userAnswers.find(a => a.questionId === nextQuestionId);
            setSelectedAnswer(nextAnswer?.answerId || "");
        } else {
            // Quiz completed - calculate results
            const correctAnswers = userAnswers.filter((answer) => {
                const question = quizData.questions.find(
                    (q) => q.id === answer.questionId
                );
                const selectedAnswer = question?.answers.find(
                    (a) => a.id === answer.answerId
                );
                return selectedAnswer?.isCorrect;
            }).length;

            console.log("Quiz completed!");
            console.log(
                `Correct answers: ${correctAnswers} out of ${quizData.questions.length}`
            );
            console.log("User answers:", userAnswers);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            const previousAnswer = userAnswers.find(
                (a) =>
                    a.questionId === quizData.questions[currentQuestionIndex - 1].id
            );
            setSelectedAnswer(previousAnswer?.answerId || "");
        }
    };

    return (
        <>
            <div className="absolute bg-primary-light h-screen w-1/2 max-lg:w-full -z-10  max-lg:h-2/5"></div>
            <div className="flex h-screen max-w-screen-2xl m-auto max-lg:flex-col w-full">
                <div className="flex flex-1  justify-between flex-col p-14 max-xl:p-10 max-lg:p-8 max-lg:flex-[2] ">
                    <div className="flex justify-between">
                        <div className="flex items-center opacity-70 cursor-pointer p-2 group hover:opacity-80">
                            <ArrowLeft className="h-3.5 w-3.5 text-primary mr-2 transition-transform group-hover:-translate-x-1" />
                            <p className="underline text-xs font-bold text-primary">
                                Return
                            </p>
                        </div>
                        {isMobile ? (
                            <SidebarTrigger>
                                <Menu />
                            </SidebarTrigger>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="font-bold">
                        <p className="mb-4 text-xl text-primary-muted">
                            question {currentQuestionIndex + 1}/
                            {quizData.questions.length}
                        </p>
                        <h2 className="text-4xl text-primary max-lg:text-3xl max-lg:mb-10">
                            {currentQuestion.question}
                        </h2>
                        <p className="mt-2 text-primary-muted text-sm">
                            Select one answer
                        </p>
                    </div>
                    <img
                        className="max-lg:hidden"
                        src="./asd"
                        alt="Logo"
                    />
                </div>
                <div className="max-lg:hidden">
                    <Separator
                        orientation="vertical"
                        className="bg-white w-px"
                    />
                </div>
                <div className="hidden max-lg:block">
                    <Separator
                        orientation="horizontal"
                        className="bg-white h-px w-full"
                    />
                </div>
                <div className="flex-1 flex flex-col h-screen p-14 max-xl:p-10 max-lg:p-8 max-lg:flex-[3]">
                    <div className="flex-1 flex items-center justify-center max-lg:hidden mb-4">
                        <img
                            src="../XD.png"
                            alt="Question image"
                        />
                    </div>
                    <div className="flex-1">
                        <QuizAnswers
                            answers={currentQuestion.answers}
                            selectedValue={selectedAnswer}
                            onAnswerSelect={handleAnswerSelect}
                        />
                    </div>
                    <div className="flex m-auto gap-6">
                        <Button
                            variant={"outline"}
                            className="px-6 py-2 w-24"
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            className="px-6 py-2 w-24"
                            onClick={handleNextQuestion}
                        >
                            {currentQuestionIndex === quizData.questions.length - 1
                                ? "Finish"
                                : "Next"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizPage;
