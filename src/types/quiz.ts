export interface QuizAnswer {
    text: string;
    isCorrect: boolean;
}

export interface QuizQuestion {
    question: string;
    answers: QuizAnswer[];
}

export interface QuizFile {
    title: string;
    questions: QuizQuestion[];
}
