/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import { Job } from '../entity/job.entity';
import {
    createJob,
    findByIdJob,
    IJob,
    getAllJob,
    deleteJob,
    searchKeyword,
    getJobCategory,
    updateJobById,
} from '../repositories/job';
import { findNumPag, findId } from '../repositories/general';
import { Category } from '../entity/category.entity';
import errorException from '../utils/errors';
import { City } from '../entity/city.entity';
import { TimeWork } from '../entity/time_work.entity';

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
        job.categoryId = await findId(category, Category);
        // @ts-ignore
        job.userId = req.user?.id;
        job.cityId = await findId(city, City);
        job.typeId = await findId(type, TimeWork);
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        job.url_logo = req.file
            ? result.url
            : 'https://res.cloudinary.com/dkgcofgap/image/upload/v1593446199/cat_ycqk39.jpg';
        await fs.unlink(req.file.path);
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
        const { category } = req.query;
        if (search) {
            const jobs = await searchKeyword(search);
            res.status(200).json(jobs);
        } else if (category) {
            const jobs = await getJobCategory(category);
            res.status(200).json(jobs);
        } else {
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
        if (!id) {
            throw new errorException(400, 'Missing parameters.');
        }
        await deleteJob(id);
        res.status(200).json({ message: 'Deleted.' });
    } catch (err) {
        next(err);
    }
}

export async function updateJob(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const {
            posicion,
            category,
            address,
            city,
            type,
            description,
            url_logo,
            idOwner,
        } = req.body;
        const job = new Job();
        job.posicion = posicion;
        job.address = address;
        job.description = description;
        job.categoryId = await findId(category, Category);
        // @ts-ignore
        job.userId = idOwner;
        job.cityId = await findId(city, City);
        job.typeId = await findId(type, TimeWork);
        job.url_logo = url_logo;
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            await fs.unlink(req.file.path);
            job.url_logo = result.url;
        }
        await updateJobById(job, id);
        res.status(201).json({ message: 'Updated.' });
    } catch (err) {
        next(err);
    }
}
