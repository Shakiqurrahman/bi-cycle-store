import { Request, Response } from 'express';

type TErrorResponse = {
    message: string;
    success: boolean;
    error: any;
    stack?: string;
};

const errorHandler = (error: any, req: Request, res: Response) => {
    const statusCode = error.status || 500;
    let errorResponse: TErrorResponse;
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
    } else {
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

export default errorHandler;
