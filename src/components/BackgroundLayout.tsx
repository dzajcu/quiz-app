import { Separator } from "@/components/ui/separator";
import BackgroundSection from "@/components/ui/background-section";
import { QuizLayoutProps } from "@/types/quiz";

const QuizLayout = ({ leftSection, rightSection, sectionPadding }: QuizLayoutProps) => {
    return (
        <>
            <BackgroundSection
                color="bg-primary-light"
                position="left"
            />
            <div className="flex h-screen max-w-screen-2xl m-auto max-lg:flex-col w-full">
                <div className={`flex flex-1 justify-between flex-col p-14 max-xl:p-10 max-lg:p-8 max-lg:flex-[2] ${sectionPadding}`}>
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
                <div className={`flex-1 flex flex-col h-screen p-14 max-xl:p-10 max-lg:p-8 max-lg:flex-[3] ${sectionPadding}`}>
                    {rightSection}
                </div>
            </div>
        </>
    );
};

export default QuizLayout;
