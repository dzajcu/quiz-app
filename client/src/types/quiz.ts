import { IconName } from "@/components/ui/icon-picker";

// Basic Data Types
export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface UserAnswer {
    questionId: string;
    answerId: string;
}

export interface RawQuestion {
    id?: number;
    question: string;
    answers: Answer[];
}

export interface Question {
    question: string;
    answers: string[];
    correctAnswerIndex: number;
}

export interface QuizFile {
    title: string;
    description: string;
    questions: {
        id: number;
        question: string;
        answers: Answer[];
    }[];
}

// Component Props
export interface QuizAnswersProps {
    answers: Answer[];
    selectedValue: string | null;
    onAnswerSelect: (value: string) => void;
}

export interface QuizAnswerProps {
    answer: string;
    value: string;
}

export interface QuizHeaderProps {
    currentQuestionIndex: number;
    totalQuestions: number;
    questionText: string;
}

export interface QuizContentProps {
    answers: Answer[];
    selectedAnswer: string | null;
    onAnswerSelect: (value: string) => void;
    onPrevious: () => void;
    onNext: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
}

export interface QuizLayoutProps {
    leftSection: React.ReactNode;
    rightSection: React.ReactNode;
    isWrapper?: boolean;
    isEven?: boolean;
}

export interface QuizNavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
}

export interface QuestionCollapsibleProps {
    questionNumber: number;
    initialQuestion?: string;
    initialAnswers?: string[];
    initialCorrectAnswerIndex?: number;
    onQuestionChange: (question: string) => void;
    onAnswerChange: (answerIndex: number, answer: string) => void;
    onCorrectAnswerChange?: (correctAnswerIndex: number) => void;
}

export interface QuestionItemProps {
    question: Question;
    index: number;
    onQuestionChange: (questionText: string) => void;
    onAnswerChange: (answerIndex: number, answerText: string) => void;
    onCorrectAnswerChange?: (correctAnswerIndex: number) => void;
    onDelete: () => void;
}

export interface QuestionListProps {
    questions: Question[];
    onQuestionChange: (index: number, questionText: string) => void;
    onAnswerChange: (index: number, answerIndex: number, answerText: string) => void;
    onCorrectAnswerChange?: (index: number, correctAnswerIndex: number) => void;
    onDeleteQuestion: (index: number) => void;
}

// Hook Props
export interface UseQuizFilesProps {
    setQuestions: (questions: Question[]) => void;
    setQuizTitle: (title: string) => void;
    setQuizDescription: (description: string) => void;
    closeCreateMethodDialog: () => void;
    openQuizDialog: () => void;
}

export interface UseQuizPlaybackResult {
    currentQuestionIndex: number;
    userAnswers: UserAnswer[];
    selectedAnswer: string | null;
    currentQuestion: {
        id: number;
        question: string;
        answers: Array<{
            id: string;
            text: string;
            isCorrect: boolean;
        }>;
    };
    handleAnswerSelect: (value: string) => void;
    handleNextQuestion: () => void;
    handlePreviousQuestion: () => void;
    isLastQuestion: boolean;
    isQuizFinished: boolean;
    quizResults: {
        correct: number;
        total: number;
    };
    handleFinishQuiz: () => void;
    resetQuiz: () => void;
}

// Context types
export interface QuizContextState {
    questions: Question[];
    quizTitle: string;
    setQuizTitle: React.Dispatch<React.SetStateAction<string>>;
    quizDescription: string;
    setQuizDescription: React.Dispatch<React.SetStateAction<string>>;
    isPublic: boolean;
    setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
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
    handleCorrectAnswerChange: (
        questionIndex: number,
        correctAnswerIndex: number
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

    // Quiz refresh
    refreshQuizzes?: () => void;
}

export type QuizContextType = QuizContextState &
    QuizDialogState &
    QuizHandlers & {
        quizIcon: IconName | undefined;
        setQuizIcon: (icon: IconName | undefined) => void;
    };

export interface Quiz {
    _id: string;
    title: string;
    isPublic: boolean;
    icon: IconName;
    questions: Array<{
        id: string;
        question: string;
        answers: Answer[];
    }>;
}
