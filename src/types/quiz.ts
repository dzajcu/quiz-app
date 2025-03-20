// Basic Data Types
export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface RawQuestion {
    id?: number;
    question: string;
    answers: Answer[];
}

export interface Question {
    question: string;
    answers: string[];
    correctAnswerIndex?: number;
}

export interface QuizFile {
    title: string;
    questions: {
        id: number;
        question: string;
        answers: Answer[];
    }[];
}

// Component Props
export interface QuizAnswersProps {
    answers: Answer[];
    selectedValue: string;
    onAnswerSelect: (value: string) => void;
}

export interface QuizAnswerProps {
    answer: string;
    value: string;
}

export interface QuestionCollapsibleProps {
    questionNumber: number;
    initialQuestion?: string;
    initialAnswers?: string[];
    onQuestionChange: (question: string) => void;
    onAnswerChange: (answerIndex: number, answer: string) => void;
}

export interface QuestionItemProps {
    question: Question;
    index: number;
    onQuestionChange: (questionText: string) => void;
    onAnswerChange: (answerIndex: number, answerText: string) => void;
    onDelete: () => void;
}

export interface QuestionListProps {
    questions: Question[];
    onQuestionChange: (index: number, questionText: string) => void;
    onAnswerChange: (index: number, answerIndex: number, answerText: string) => void;
    onDeleteQuestion: (index: number) => void;
}

// Hook Props
export interface UseQuizFilesProps {
    setQuestions: (questions: Question[]) => void;
    setQuizTitle: (title: string) => void;
    closeCreateMethodDialog: () => void;
    openQuizDialog: () => void;
}

// Context types
export interface QuizContextState {
    questions: Question[];
    quizTitle: string;
    setQuizTitle: React.Dispatch<React.SetStateAction<string>>;
    hasDraft: boolean;
}

export interface QuizDialogState {
    isQuizDialogOpen: boolean;
    isCreateMethodDialogOpen: boolean;
    isSaveDraftDialogOpen: boolean;
}

export interface QuizHandlers {
    // Question management
    handleAddQuestion: () => void;
    handleDeleteQuestion: (index: number) => void;
    handleQuestionChange: (index: number, questionText: string) => void;
    handleAnswerChange: (
        questionIndex: number,
        answerIndex: number,
        answerText: string
    ) => void;

    // Quiz actions
    handleSaveQuiz: () => void;
    handleSaveDraft: () => void;
    handleDiscardDraft: () => void;

    // Dialog management
    handleOpenQuizDialog: () => void;
    handleCloseQuizDialog: (open: boolean) => void;
    handleBackToMethodSelect: () => void;
    handleCancelSaveDraft: () => void;
    setShowCreateMethodDialog: (open: boolean) => void;
    setShowSaveDraftDialog: (open: boolean) => void;

    // File management
    handleFileSelect: (file: File) => void;
    handleManualCreate: (count: number) => void;
}

export type QuizContextType = QuizContextState & QuizDialogState & QuizHandlers;
