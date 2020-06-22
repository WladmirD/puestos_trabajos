/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction} from 'express'
import errorException from '../utils/errors';

export default function isPoster(req: Request,_res: Response, next: NextFunction) {
    // @ts-ignore
    const { type } = req.user;
    if( type !== 'Poster') {
        throw new errorException(403,'Permission denied.');
    }
    next();
}