import QuizCreationButton from "./components/QuizCreation/QuizCreationButton";
import BackgroundLayout from "../../components/BackgroundLayout";
import QuizMenuCard from "./components/QuizMenu/QuizMenuCard";

const QuizMenu = () => {
    const leftSection = (
        <div className="flex flex-col h-full w-full">
            <h2 className="text-2xl font-bold pb-4 text-right">Quiz Menu</h2>
            <div className="flex-1 overflow-auto">
                <div className="flex flex-col items-end gap-4 pr-4">
                    {/* <QuizCreationButton /> */}
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                    <QuizMenuCard
                        title="Quiz 1"
                        description="Description of Quiz 1"
                    />
                </div>
            </div>
        </div>
    );

    const rightSection = (
        <div className="flex flex-col h-full w-full max-w-max">
            <h2 className="text-2xl font-bold pb-4">Quiz Options</h2>
            <div className="flex-1 overflow-auto">
                <div className="flex flex-col items-start gap-4">
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                    <QuizMenuCard
                        title="Quiz 2"
                        description="Description of Quiz 2"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <BackgroundLayout
                leftSection={leftSection}
                rightSection={rightSection}
            />
        </>
    );
};

export default QuizMenu;
