import { Request, Response, NextFunction } from 'express';
import { Category } from '../entity/category.entity';
import { City } from '../entity/city.entity';
import { updateCategory, getAll, createCategory as createCat } from '../repositories/general';
import errorException from '../utils/errors';

export async function updateCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new errorException(400, 'Missing parameters.');
        }
        await updateCategory(id);
        res.status(200).json({ message: 'Ok' });
    } catch (err) {
        next(err);
    }
}

export async function getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getAll(Category, { isActive: true });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export async function getAllCities(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getAll(City, {});
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export async function getAdminCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getAll(Category, {});
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;
        if (!name) {
            throw new errorException(400, 'Missing parameters.');
        }
        await createCat(name);
        res.status(201).json({ message: 'Created' });
    } catch (err) {
        next(err);
    }
}
