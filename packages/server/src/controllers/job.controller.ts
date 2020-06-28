/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { Job } from '../entity/job.entity';
import { City } from '../entity/city.entity';
import { TimeWork } from '../entity/time_work.entity';
import { Category } from '../entity/category.entity';
import { createJob, findByIdJob, IJob, getAllJob, deleteJob, searchKeyword } from '../repositories/job';
import { findNumPag } from '../repositories/general';
import { findById } from '../repositories/general';
import errorException from '../utils/errors';

export async function createJobCT(req: Request, res: Response, next: NextFunction) {
    try {
        const { posicion, category, address, city, type, description } = req.body;
        if (!posicion || !category || !address || !city || !type || !description) {
            throw new errorException(400, 'Missing parameters.');
        }
        const job: Job = new Job();
        job.posicion = posicion;
        job.address = address;
        job.description = description;
        job.categoryId = category;
        // @ts-ignore
        job.userId = req.user?.id;
        job.cityId = city;
        job.typeId = type;
        job.url_logo = req.file ? `${req.file.filename}` : 'Ninguno';
        await createJob(job);
        res.status(201).json({ message: 'Created.' });
    } catch (err) {
        next(err);
    }
}

export async function findJob(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const result: IJob | any = await findByIdJob(parseInt(id));
        if (!result) {
            throw new errorException(404, 'Not found.');
        }
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export async function getJobs(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query || 1;
        const { search } = req.query;
        if ( search) {
            const jobs = await searchKeyword(search);
            res.status(200).json(jobs);
        }
        else {
            const limit = await findNumPag();
            const jobs = await getAllJob(limit, page);
            res.status(200).json(jobs);
        }
    } catch (err) {
        next(err);
    }
}

export async function deleteJobById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        if ( !id ) { throw new errorException(400, 'Missing parameters.'); }
        await deleteJob(id);
        res.status(200).json({ message: 'Deleted.' });
    } catch(err) {
        next(err);
    }
}
