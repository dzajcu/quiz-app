// types/quiz.tsx
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
}

export interface QuizFile {
    title?: string;
    questions: RawQuestion[];
}