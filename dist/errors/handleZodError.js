"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const statusCode = 400;
    const message = 'Validation Error';
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.handleZodError = handleZodError;
exports.default = exports.handleZodError;
