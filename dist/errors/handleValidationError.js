"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const statusCode = 400;
    const message = 'Validation Error';
    const errorSources = Object.values(err.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleValidationError;
