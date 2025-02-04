import { z } from 'zod';

const updateUser = z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
});

const changePassword = z.object({
    oldPassword: z.string({
        required_error: 'Old password is required.',
    }),
    newPassword: z.string({
        required_error: 'New password is required.',
    }),
});

const statusUpdate = z.object({
    isBlocked: z.boolean(),
});

export const userValidation = {
    changePassword,
    updateUser,
    statusUpdate,
};
