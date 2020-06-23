import { getRepository } from 'typeorm';
import { Job } from '../entity/job.entity';
import errorException from '../utils/errors';

export interface IJob {
    id: number;
    posicion: string;
    category: string;
    address: string;
    city: string;
    type: string;
    url_logo?: string;
    description: string;
    created_time: Date;
    owner: string;
}

/**
 *
 * @param job Job to find of object of that.
 * @return Job
 */
export async function createJob(job: Job): Promise<Job | undefined> {
    try {
        return await getRepository(Job).save(job);
    } catch(err) {
        throw new errorException(500,err);
    }
}


/**
 *
 * @param id of job type number
 * @return object type IJob
 */
export async function findByIdJob(id: number) {
    try {
        const [result]: Job | any = await getRepository(Job).find({ id: id});
        const job: IJob | any = new Object();
        job['id'] = result.id;
        job['posicion'] = result.posicion;
        const { name: category } = result.category;
        job['category'] = category;
        job['address'] = result.address;
        const { name: city} = result.city;
        job['city'] = city;
        job['url_logo'] = result.url_logo ? result.url_logo : undefined;
        job['description'] = result.description;
        job['created_time'] = result.created_time;
        const { name: owner} = result.owner;
        job['owner'] = owner;
        return job;
    } catch(err) {
        throw new errorException(500,err);
    }
}