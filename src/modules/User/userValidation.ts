import { z } from 'zod';

const updateUser = z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
});

const changePassword = z.object({
    oldPassword: z.string({
        required_error: 'Old password is required.',
    }),
    newPassword: z.string({
        required_error: 'New password is required.',
    }),
});

export const userValidation = {
    changePassword,
    updateUser,
};
