/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import { Job } from '../entity/job.entity';
import { City } from '../entity/city.entity';
import { TimeWork } from '../entity/time_work.entity';
import { Category } from '../entity/category.entity';
import { createJob } from '../repositories/job';
import { findById } from '../repositories/general';
import errorException from '../utils/errors';


export async function createJobCT(req: Request, res: Response, next: NextFunction) {
    try {
        const { posicion, category, address, city, type, description, url_logo} = req.body;
        if( !posicion || !category || !address || !city || !type || !description) {
            throw new errorException(400, "Missing parameters.");
        }
        const job: Job = new Job();
        job.posicion = posicion;
        job.address = address;
        job.description = description;
        job.categoryId = await findById(category, Category);
        // @ts-ignore
        job.userId = req.user?.id;
        job.cityId = await findById(city, City);
        job.typeId = await findById(type, TimeWork);
        job.url_logo = url_logo ? url_logo : null;
        await createJob(job);
        res.status(201).json({ message: 'Created.' });
    } catch(err) {
        next(err);
    }
}