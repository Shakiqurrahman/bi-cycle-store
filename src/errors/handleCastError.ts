import { Error } from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (err: Error.CastError): TGenericErrorResponse => {
    const statusCode = 400;
    const message = 'Invalid ID';
    const errorSources: TErrorSources = [
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

export default handleCastError;
