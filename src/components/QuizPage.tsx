import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const QuizPage = () => {
    return (
        <div className="flex h-screen">
            <div className="flex justify-between flex-col flex-1 h-full bg-cyan-50 p-14">
                <div className="flex  items-center opacity-70">
                    <ArrowLeft className="h-3 w-3 text-cyan-700 mr-2" />
                    <p className="underline text-cyan-700 text-xs font-bold">
                        Return
                    </p>
                </div>
                <div className="font-bold">
                    <p className="mb-4 text-xl text-cyan-600 opacity-70">
                        question 1/5
                    </p>
                    <h2 className="text-4xl  text-cyan-700">
                        Ligo lego panie kolego
                    </h2>
                    <p className="mt-2 text-cyan-600 text-sm opacity-70">
                        Select one answer
                    </p>
                </div>
                <img
                    src="./asd"
                    alt="Logo"
                />
            </div>

            <div className="flex-1 flex flex-col h-screen p-14">
                <div className="flex-1 flex items-center justify-center">
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
                            <div className="flex items-center rounded-lg border m-auto border-gray-200 peer-data-[state=checked]:bg-cyan-50 peer-data-[state=checked]:border-cyan-700 max-w">
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
                            <div className="flex items-center p-4 rounded-lg border border-gray-200 peer-data-[state=checked]:bg-cyan-50 peer-data-[state=checked]:border-cyan-700">
                                <Label
                                    htmlFor="2"
                                    className="cursor-pointer w-full text-lg"
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
                            <div className="flex items-center p-4 rounded-lg border border-gray-200 peer-data-[state=checked]:bg-cyan-50 peer-data-[state=checked]:border-cyan-700">
                                <Label
                                    htmlFor="3"
                                    className="cursor-pointer w-full text-lg"
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
                            <div className="flex items-center p-4 rounded-lg border border-gray-200 peer-data-[state=checked]:bg-cyan-50 peer-data-[state=checked]:border-cyan-700">
                                <Label
                                    htmlFor="4"
                                    className="cursor-pointer w-full text-lg"
                                >
                                    Explore new ideas and concepts
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex justify-around w-1/2 m-auto">
                    <Button className="bg-white text-cyan-700 border border-cyan-700 px-6 py-2 rounded-md">
                        Previous
                    </Button>
                    <Button className="bg-cyan-700 text-white px-6 py-2 rounded-md">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
