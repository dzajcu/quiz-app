import QuizCreationButton from "./components/QuizCreation/QuizCreationButton";
import BackgroundLayout from "../../components/BackgroundLayout";
import QuizMenuCard from "./components/QuizMenu/QuizMenuCard";

const QuizMenu = () => {
    const leftSection = (
        <div className="flex flex-col h-full w-full overflow-auto no-scrollbar p-14">
            <h2 className="text-2xl font-bold pb-4 text-right">Your Quizes</h2>
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                <QuizCreationButton />
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
    );

    const rightSection = (
        <div className="flex flex-col h-full w-full overflow-auto no-scrollbar p-14">
            <h2 className="text-2xl font-bold pb-4">Popular Quizes</h2>
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
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
    );

    return (
        <>
            <BackgroundLayout
                leftSection={leftSection}
                rightSection={rightSection}
                sectionPadding="p-[0]"
                isWrapper={false}
            />
        </>
    );
};

export default QuizMenu;
