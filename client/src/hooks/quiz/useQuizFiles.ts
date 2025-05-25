import { useCallback } from "react";
import { Question, QuizFile, UseQuizFilesProps } from "@/types/quiz";
import { toast } from "sonner";

export const useQuizFiles = ({
    setQuestions,
    setQuizTitle,
    setQuizDescription,
    closeCreateMethodDialog,
    openQuizDialog,
}: UseQuizFilesProps) => {
    const parseTxtFile = useCallback(
        (
            content: string
        ): { title: string; description: string; questions: Question[] } => {
            try {
                const parts = content
                    .split(";")
                    .map((part) => part.trim())
                    .filter((part) => part);
                if (parts.length < 2) {
                    throw new Error(
                        "File must contain at least a title and one question"
                    );
                }

                const title = parts[0] || "New Quiz";
                const description = parts[1] || "";
                const questions = parts.slice(2);

                const parsedQuestions = questions.map((questionStr) => {
                    const parts = questionStr.split(",").map((p) => p.trim());
                    if (parts.length < 3) {
                        throw new Error(`Invalid question format: ${questionStr}`);
                    }

                    const question = parts[0];
                    const correctAnswerIndex = parseInt(parts[1]) - 1;
                    const answers = parts.slice(2, 6);

                    if (
                        correctAnswerIndex < 0 ||
                        correctAnswerIndex >= answers.length
                    ) {
                        throw new Error(
                            `Invalid correct answer index in question: ${question}`
                        );
                    }

                    while (answers.length < 4) {
                        answers.push("");
                    }

                    return {
                        question,
                        answers,
                        correctAnswerIndex,
                    };
                });

                return {
                    title,
                    description,
                    questions: parsedQuestions,
                };
            } catch (error) {
                throw new Error(
                    `Failed to parse TXT file: ${
                        error instanceof Error ? error.message : "Unknown error"
                    }`
                );
            }
        },
        []
    );

    const parseJsonFile = useCallback(
        (
            content: QuizFile
        ): { title: string; description: string; questions: Question[] } => {
            try {
                return {
                    title: content.title || "New Quiz",
                    description: content.description || "",
                    questions: content.questions.map((q) => {
                        const answers = q.answers?.map((a) => a?.text || "") || [
                            "",
                            "",
                            "",
                            "",
                        ];
                        while (answers.length < 4) {
                            answers.push("");
                        }
                        const correctAnswerIndex =
                            q.answers?.findIndex((a) => a?.isCorrect) || 0;
                        return {
                            question: q.question || "",
                            answers,
                            correctAnswerIndex:
                                correctAnswerIndex >= 0 ? correctAnswerIndex : 0,
                        };
                    }),
                };
            } catch (error) {
                throw new Error(
                    `Failed to parse JSON file: ${
                        error instanceof Error ? error.message : "Unknown error"
                    }`
                );
            }
        },
        []
    );

    const handleFileSelect = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    let parsedData: {
                        title: string;
                        description: string;
                        questions: Question[];
                    };

                    if (file.name.toLowerCase().endsWith(".json")) {
                        const jsonContent = JSON.parse(content) as QuizFile;
                        parsedData = parseJsonFile(jsonContent);
                    } else if (file.name.toLowerCase().endsWith(".txt")) {
                        parsedData = parseTxtFile(content);
                    } else {
                        throw new Error(
                            "Unsupported file format. Please use .txt or .json"
                        );
                    }

                    if (parsedData.questions.length === 0) {
                        throw new Error("No valid questions found in the file");
                    }
                    const mappedQuestions = parsedData.questions.map((q) => ({
                        question: q.question,
                        answers: q.answers,
                        correctAnswerIndex:
                            typeof q.correctAnswerIndex === "number"
                                ? q.correctAnswerIndex
                                : 0,
                    }));

                    setQuestions(mappedQuestions);
                    setQuizTitle(parsedData.title);
                    setQuizDescription(parsedData.description || "");
                    closeCreateMethodDialog();
                    openQuizDialog();

                    toast.success("File loaded successfully", {
                        description: `Loaded ${parsedData.questions.length} questions`,
                    });
                } catch (error: unknown) {
                    toast.error("Error reading file", {
                        description:
                            error instanceof Error ? error.message : "Unknown error",
                    });
                }
            };
            reader.readAsText(file);
        },
        [
            parseTxtFile,
            setQuestions,
            setQuizDescription,
            setQuizTitle,
            parseJsonFile,
            closeCreateMethodDialog,
            openQuizDialog,
        ]
    );
    const handleManualCreate = useCallback(
        (count: number) => {
            const validCount = Math.min(Math.max(1, count), 200);
            setQuestions(
                Array.from({ length: validCount }, () => ({
                    question: "",
                    answers: ["", "", "", ""],
                    correctAnswerIndex: 0,
                }))
            );
            closeCreateMethodDialog();
            openQuizDialog();
        },
        [closeCreateMethodDialog, openQuizDialog, setQuestions]
    );

    return {
        handleFileSelect,
        handleManualCreate,
    };
};
