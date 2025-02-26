import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const QuizPage = () => {
    return (
        <>
            <div className="absolute bg-primary-light h-screen w-2/4 -z-10 max-md:w-screen max-md:h-2/5"></div>
            <div className="flex h-screen max-w-screen-2xl m-auto max-md:flex-col">
                <div className="flex justify-between flex-col flex-1 p-14 max-md:flex-[2] max-md:p-10">
                    <div className="flex items-center opacity-70">
                        <ArrowLeft className="h-3 w-3 text-primary mr-2" />
                        <p className="underline text-primary text-xs font-bold">
                            Return
                        </p>
                    </div>
                    <div className="font-bold">
                        <p className="mb-4 text-xl text-primary-muted">
                            question 1/5
                        </p>
                        <h2 className="text-4xl text-primary max-md:text-3xl max-md:mb-10">
                            What is your goal? Granie w ligo lego panie kolego
                        </h2>
                        <p className="mt-2 text-primary-muted text-sm">
                            Select one answer
                        </p>
                    </div>
                    <img
                        className="max-md:hidden"
                        src="./asd"
                        alt="Logo"
                    />
                </div>

                <div className="flex-1 flex flex-col h-screen p-14 max-md:flex-[3] max-md:p-10">
                    <div className="flex-1 flex items-center justify-center max-md:hidden">
                        <img
     
                            src="./asd"
                            alt="Question image"
                        />
                    </div>
                    <div className="flex-1">
                        <RadioGroup
                            defaultValue="explore"
                            className="space-y-4"
                        >
                            <div className="relative">
                                <RadioGroupItem
                                    className="peer sr-only"
                                    value="1"
                                    id="1"
                                />
                                <div className="flex items-center rounded-lg border m-auto border-primary-muted peer-data-[state=checked]:bg-primary-light peer-data-[state=checked]:border-primary max-w">
                                    <Label
                                        htmlFor="1"
                                        className="cursor-pointer w-full  p-4 text-md"
                                    >
                                        Relax and unwind
                                    </Label>
                                </div>
                            </div>

                            <div className="relative">
                                <RadioGroupItem
                                    className="peer sr-only"
                                    value="2"
                                    id="2"
                                />
                                <div className="flex items-center p-4 rounded-lg border border-primary-muted peer-data-[state=checked]:bg-primary-light peer-data-[state=checked]:border-primary">
                                    <Label
                                        htmlFor="2"
                                        className="cursor-pointer w-full text-md"
                                    >
                                        Comfortable
                                    </Label>
                                </div>
                            </div>

                            <div className="relative">
                                <RadioGroupItem
                                    className="peer sr-only"
                                    value="3"
                                    id="3"
                                />
                                <div className="flex items-center p-4 rounded-lg border border-primary-muted peer-data-[state=checked]:bg-primary-light peer-data-[state=checked]:border-primary">
                                    <Label
                                        htmlFor="3"
                                        className="cursor-pointer w-full text-md"
                                    >
                                        Explore new ideas and concepts
                                    </Label>
                                </div>
                            </div>
                            <div className="relative">
                                <RadioGroupItem
                                    className="peer sr-only"
                                    value="4"
                                    id="4"
                                />
                                <div className="flex items-center p-4 rounded-lg border border-primary-muted peer-data-[state=checked]:bg-primary-light peer-data-[state=checked]:border-primary">
                                    <Label
                                        htmlFor="4"
                                        className="cursor-pointer w-full text-md"
                                    >
                                        Explore new ideas and concepts
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex m-auto gap-6">
                        <Button
                            variant={"outline"}
                            className="text-primary border-primary-muted px-6 py-2 w-24 hover:bg-primary-light hover:border-primary hover:text-primary"
                        >
                            Previous
                        </Button>
                        <Button className="bg-primary text-white px-6 py-2 w-24 hover:bg-cyan-800 hover:text-white">
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizPage;
