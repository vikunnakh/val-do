export interface Question {
    question: string;
    answers: {
        answer: string;
        isCorrect: boolean
    }[];
}
