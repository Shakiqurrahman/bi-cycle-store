import { Error } from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
    err: Error.ValidationError,
): TGenericErrorResponse => {
    const statusCode = 400;
    const message = 'Validation Error';
    const errorSources: TErrorSources = Object.values(err.errors).map(
        (value: Error.ValidatorError | Error.CastError) => {
            return {
                path: value?.path,
                message: value?.message,
            };
        },
    );

    return {
        statusCode,
        message,
        errorSources,
    };
};

export default handleValidationError;
