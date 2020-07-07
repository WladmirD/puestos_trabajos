/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import errorException from '../utils/errors';

export default function handleErrors(
    err: errorException,
    req: Request,
    res: Response,
    next: NextFunction,
): Response {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(status).json({
        error: 'error',
        message: message,
    });
}
