"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res) => {
    const statusCode = error.status || 500;
    let errorResponse;
    if (error.name === 'ZodError') {
        errorResponse = {
            message: 'Validation Failed',
            success: false,
            error: {
                name: 'ValidationError',
                errors: error.errors,
            },
            stack: error.stack,
        };
    }
    else {
        errorResponse = {
            message: error.message || 'Something Went Wrong',
            success: false,
            error: {
                name: error.name || 'Error',
                errors: error.errors,
            },
            stack: error.stack,
        };
    }
    res.status(statusCode).json(errorResponse);
};
exports.default = errorHandler;
