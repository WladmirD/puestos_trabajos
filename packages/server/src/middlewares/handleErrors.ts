/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { GeneralError } from '../utils/errors';

export const handleErrors = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
): Response => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: err.message,
    });
};
