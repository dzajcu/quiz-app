import { Separator } from "@/components/ui/separator";
import BackgroundSection from "@/components/ui/background-section";
import { QuizLayoutProps } from "@/types/quiz";

const QuizLayout = ({
    leftSection,
    rightSection,
    isWrapper = true,
    isEven = true,
}: QuizLayoutProps) => {
    return (
        <>
            <BackgroundSection
                color="bg-primary-light"
                position="left"
                isEven={isEven}
            />
            <div
                className={`flex h-screen ${
                    isWrapper ? "max-w-screen-2xl" : ""
                } m-auto max-lg:flex-col w-full`}
            >
                <div
                    className={`flex flex-1 flex-col p-14 max-xl:p-10 max-lg:p-6 max-md:pt-20 max-lg:flex-[2] ${isEven ? "max-lg:max-h-[50vh]" : "max-lg:max-h-[40vh]"}`}
                >
                    {leftSection}
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
                <div
                    className={`flex-1 flex flex-col p-14 max-xl:p-10 max-lg:p-6 max-lg:flex-[${isEven ? "2" : "3"}]`}
                >
                    {rightSection}
                </div>
            </div>
        </>
    );
};

export default QuizLayout;
