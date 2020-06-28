import { Request, Response, NextFunction } from 'express';
import { updateCategory, getCategories} from '../repositories/general';
import errorException from '../utils/errors';

export async function updateCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        if ( !id ) { throw new errorException(400, 'Missing parameters.'); }
        await updateCategory(id);
        res.status(200).json({ message: "Ok" });
    } catch(err) {
        next(err);
    }
}

export async function getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getCategories();
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
}