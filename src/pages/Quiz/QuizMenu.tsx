import QuizCreationButton from "./components/QuizCreation/QuizCreationButton";
import BackgroundLayout from "../../components/BackgroundLayout";
import QuizMenuCard from "./components/QuizMenu/QuizMenuCard";

const QuizMenu = () => {
    const leftSection = (
        <div className="flex flex-col h-full w-full overflow-auto no-scrollbar p-14">
            <h2 className="text-2xl font-bold pb-4 text-right">Quiz Menu</h2>
            <div className="flex flex-col items-end gap-4 ">
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
    );

    const rightSection = (
        <div className="flex flex-col h-full overflow-auto no-scrollbar p-14">
            <h2 className="text-2xl font-bold pb-4">Quiz Options</h2>
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
    );

    return (
        <>
            <BackgroundLayout
                leftSection={leftSection}
                rightSection={rightSection}
                sectionPadding="p-[0]"
            />
        </>
    );
};

export default QuizMenu;
