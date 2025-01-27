/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const statusCode = 400;
    const match = err.message.match(/"([^"]*)"/);
    const message = match && `${match[1]} is already exists`;

    const errorSources: TErrorSources = [
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

export default handleDuplicateError;
