import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputQuiz } from "@/components/ui/input-quiz";
import InputFile from "@/components/ui/input-file";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuiz } from "@/contexts/QuizContext";

const CreateMethodDialog = () => {
    const {
        isCreateMethodDialogOpen,
        setShowCreateMethodDialog,
        handleFileSelect,
        handleManualCreate,
    } = useQuiz();
    const [initialQuestionCount, setInitialQuestionCount] = useState<number>(1);

    const handleManualCreateClick = () => {
        handleManualCreate(Number(initialQuestionCount));
    };

    return (
        <Dialog
            open={isCreateMethodDialogOpen}
            onOpenChange={setShowCreateMethodDialog}
        >
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Create New Quiz</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-[1fr_auto_1fr] grid-cols-1 gap-6 mt-4 items-center">
                    <div className="flex flex-col p-6 space-y-4 border-1 border-gray-300 rounded-xl hover:border-primary shadow-lg transition-all duration-300 items-center justify-center">
                        <h3 className="text-lg font-semibold text-primary">
                            Create Manually
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Enter the number of questions (1-200)
                                </p>
                                <InputQuiz
                                    type="number"
                                    min="1"
                                    max="200"
                                    value={initialQuestionCount}
                                    onChange={(e) =>
                                        setInitialQuestionCount(
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-18 mx-auto text-center"
                                    placeholder="Number of questions"
                                />
                            </div>
                            <Button
                                className="w-full"
                                onClick={handleManualCreateClick}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Start Creating
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col m-auto max-md:flex-row items-center gap-2">
                        <div className="w-px h-6 max-md:w-6 max-md:h-px bg-gray-300"></div>
                        <span className="text-sm font-medium text-muted-foreground">
                            OR
                        </span>
                        <div className="w-px h-6 max-md:w-6 max-md:h-px bg-gray-300"></div>
                    </div>
                    <div className="flex flex-col h-full">
                        <InputFile
                            onFileSelect={handleFileSelect}
                            accept=".txt,.json"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateMethodDialog;
