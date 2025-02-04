"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const updateUser = zod_1.z.object({
    name: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
});
const changePassword = zod_1.z.object({
    oldPassword: zod_1.z.string({
        required_error: 'Old password is required.',
    }),
    newPassword: zod_1.z.string({
        required_error: 'New password is required.',
    }),
});
const statusUpdate = zod_1.z.object({
    isBlocked: zod_1.z.boolean(),
});
exports.userValidation = {
    changePassword,
    updateUser,
    statusUpdate,
};
