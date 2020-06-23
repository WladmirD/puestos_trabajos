/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction} from 'express'
import errorException from '../utils/errors';

export function isPoster(req: Request,_res: Response, next: NextFunction) {
    // @ts-ignore
    const { type } = req.user;
    if( type !== 'Poster') {
        throw new errorException(403,'Permission denied.');
    }
    next();
}

export function isAdmin(req: Request,_res: Response, next: NextFunction) {
    // @ts-ignore
    const { type } = req.user;
    if( type !== 'Administrador') {
        throw new errorException(403,'Permission denied.');
    }
    next();
}