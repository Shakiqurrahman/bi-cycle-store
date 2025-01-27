import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { IUser } from './userInterface';

const userModel = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// pre-save hook to hash the password before saving
userModel.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            next(error);
        }
    }
    next();
});

// method to compare the password
userModel.methods.comparePassword = async function (
    password: string,
): Promise<boolean> {
    const user = this as IUser;
    return await bcrypt.compare(password, user.password);
};

export const User = model<IUser>('User', userModel);
