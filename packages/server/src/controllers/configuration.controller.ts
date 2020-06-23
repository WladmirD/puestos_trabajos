import { Request, Response, NextFunction } from 'express';
import { findNumPag, updateNummPag } from '../repositories/general';
import { Configuration } from '../entity/configuration.entity';
import errorException from '../utils/errors';

export async function findPag(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await findNumPag(Configuration);
        res.status(200).json({ numPagination: result });
    } catch(err) {
        next(err);
    }
}

export async function updatePag(req: Request, res: Response, next: NextFunction) {
    try {
        const { numPagination } = req.body;
        if ( !numPagination ) {
            throw new errorException(400,'Missing parameters.');
        }
        await updateNummPag(numPagination);
        res.status(200).json({ message: 'OK'});
    } catch(err) {
        next(err);
    }
}