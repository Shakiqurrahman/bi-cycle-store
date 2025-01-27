"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const statusCode = 400;
    const match = err.message.match(/"([^"]*)"/);
    const message = match && `${match[1]} is already exists`;
    const errorSources = [
        {
            path: '',
            message: message,
        },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleDuplicateError;
