import { Request, Response, NextFunction } from 'express';
import { Category } from '../entity/category.entity';
import { City } from '../entity/city.entity';
import { updateCategory, getAll} from '../repositories/general';
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
        const result = await getAll(Category);
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
}

export async function getAllCities(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getAll(City);
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
}