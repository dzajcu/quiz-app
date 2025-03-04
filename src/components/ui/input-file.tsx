import { Upload, HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InputFileProps {
    onFileSelect: (file: File) => void;
}

const InputFile = ({ onFileSelect }: InputFileProps) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (
                file.name.toLowerCase().endsWith(".txt") ||
                file.name.toLowerCase().endsWith(".json")
            ) {
                onFileSelect(file);
            } else {
                // Optional: Show error for invalid file type
                console.error("Invalid file type");
            }
        }
    };

    // Prevent default drag behavior on the entire document
    if (typeof window !== "undefined") {
        window.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        window.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            <label
                htmlFor="dropzone-file"
                className={cn(
                    "flex flex-col items-center justify-center w-full h-full p-6 border-2 border-dashed rounded-xl cursor-pointer bg-background/50 transition-all duration-300 ease-in-out transform hover:scale-[1.01] group",
                    isDragging
                        ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                        : "border-gray-300 hover:bg-primary/5 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div
                        className={cn(
                            "p-4 rounded-full transition-all duration-300",
                            isDragging
                                ? "bg-primary/20 scale-110"
                                : "bg-primary/10 group-hover:scale-105"
                        )}
                    >
                        <Upload
                            className={cn(
                                "w-8 h-8 text-primary transition-all duration-300",
                                isDragging
                                    ? "animate-bounce"
                                    : "group-hover:animate-bounce"
                            )}
                        />
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-primary">
                                Upload Questions File
                            </p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors padding" />
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="right"
                                        className="w-[350px]"
                                    >
                                        <div className="space-y-2">
                                            <p className="font-semibold">
                                                Supported file formats:
                                            </p>
                                            <div className="space-y-1">
                                                <p className="text-sm">
                                                    <span className="font-medium">
                                                        TXT Format:
                                                    </span>{" "}
                                                    Title and questions separated by
                                                    semicolons:
                                                </p>
                                                <p className="text-xs text-muted-foreground font-mono bg-muted p-1 rounded break-all">
                                                    Quiz
                                                    Title;Question,CorrectAnswerNumber,Answer1,Answer2,Answer3,Answer4;
                                                </p>
                                                <p className="text-xs">Example:</p>
                                                <p className="text-xs text-muted-foreground font-mono bg-muted p-1 rounded">
                                                    My Geography Quiz;Is Earth
                                                    round?,1,Yes,No;
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm">
                                                    <span className="font-medium">
                                                        JSON Format:
                                                    </span>{" "}
                                                    Object with title and questions:
                                                </p>
                                                <p className="text-xs text-muted-foreground font-mono bg-muted p-1 rounded whitespace-pre-wrap">
                                                    {`{
  "title": "My Geography Quiz",
  "questions": [{
    "question": "Is Earth round?",
    "answers": [
      { "text": "Yes", "isCorrect": true },
      { "text": "No", "isCorrect": false }
    ]
  }]
}`}
                                                </p>
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {isDragging
                                ? "Drop file here"
                                : "Drop your TXT or JSON file here or click to browse"}
                        </p>
                    </div>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept=".txt,.json"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export default InputFile;
