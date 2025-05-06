import mongoose, { Document, Schema } from "mongoose";
import * as argon2 from "argon2";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    isActive: boolean;
    role: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [20, "Username cannot exceed 20 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await argon2.hash(this.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1,
        });
        next();
    } catch (error: any) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return argon2.verify(this.password, candidatePassword);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
