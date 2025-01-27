"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const message = 'Invalid ID';
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleCastError;
