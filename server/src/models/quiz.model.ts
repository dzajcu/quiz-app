import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";

interface IAnswer {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface IQuestion {
    id: number;
    question: string;
    answers: IAnswer[];
}

export interface IQuiz extends Document {
    title: string;
    author: Schema.Types.ObjectId;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    questions: IQuestion[];
    icon: string;
}

const answerSchema = new Schema<IAnswer>({
    text: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
});

const questionSchema = new Schema<IQuestion>({
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [answerSchema],
        required: true,
        validate: [
            {
                validator: function (answers: IAnswer[]) {
                    return answers.length >= 2 && answers.length <= 4;
                },
                message: "Each question must have between 2 and 4 answers",
            },
            {
                validator: function (answers: IAnswer[]) {
                    return answers.filter((a) => a.isCorrect).length === 1;
                },
                message: "Each question must have exactly one correct answer",
            },
        ],
    },
});

const quizSchema = new Schema<IQuiz>(
    {
        title: {
            type: String,
            required: [true, "Quiz title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters long"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        questions: {
            type: [questionSchema],
            required: true,
            validate: {
                validator: function (questions: IQuestion[]) {
                    return questions.length > 0;
                },
                message: "Quiz must have at least one question",
            },
        },
        icon: {
            type: String,
            required: [true, "Quiz icon is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;
