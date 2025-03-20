import BackgroundSection from "@/components/ui/background-section";
import QuizCreationButton from "./components/QuizCreation/QuizCreationButton";


const QuizMenu = () => {

    return (
        <>
            <BackgroundSection
                color="bg-primary-light"
                position="left"
            />
            <QuizCreationButton />
        </>
    );
};

export default QuizMenu;
