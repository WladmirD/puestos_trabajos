import { getRepository } from 'typeorm';
import { Job } from '../entity/job.entity';

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
    return await getRepository(Job).save(job);
}

/**
 *
 * @param id of job type number
 * @return object type IJob
 */
export async function findByIdJob(id: number) {
    const [result]: Job | any = await getRepository(Job).find({ id: id });
    const job: IJob | any = new Object();
    job['id'] = result.id;
    job['posicion'] = result.posicion;
    const { name: category } = result.category;
    job['category'] = category;
    job['address'] = result.address;
    const { name: city } = result.city;
    job['city'] = city;
    job['url_logo'] = result.url_logo ? result.url_logo : undefined;
    job['description'] = result.description;
    job['created_time'] = result.created_time;
    const { name: owner } = result.owner;
    job['owner'] = owner;
    return job;
}

export async function getAllJob(limit: number | any, pages: number | any) {
    const [result, total] = await getRepository(Job)
        .createQueryBuilder('job')
        .select(['job.id', 'job.posicion', 'job.address', 'job.created_time'])
        .innerJoinAndSelect('job.owner', 'owner')
        .innerJoinAndSelect('job.city', 'city')
        .innerJoinAndSelect('job.category', 'category', 'category.isActive = :category', {
            category: true,
        })
        .orderBy('job.created_time', 'DESC')
        .addOrderBy('category.name', 'DESC')
        .take(limit * pages)
        .skip((pages - 1) * limit)
        .getManyAndCount();
    const jobs = manipulateData(result);
    return { jobs, total: Math.ceil(total / limit) };
}
export async function searchKeyword(search: string | any) {
    const result = await getRepository(Job)
        .createQueryBuilder('job')
        .select(['job.id', 'job.posicion', 'job.address', 'job.created_time'])
        .innerJoinAndSelect('job.category', 'category', 'category.isActive = :category', {
            category: true,
        })
        .innerJoinAndSelect('job.city', 'city')
        .innerJoinAndSelect('job.owner', 'owner')
        .where('job.posicion like :search', { search: `%${search}%` })
        .orWhere('job.address like :search', { search: `%${search}%` })
        .orWhere('category.name like :search', { search: `%${search}%` })
        .orWhere('city.name like :search', { search: `%${search}%` })
        .orWhere('owner.name like :search', { search: `%${search}%` })
        .getMany();
    const jobs = manipulateData(result);
    return jobs;
}
export async function deleteJob(id: number | any) {
    return await getRepository(Job).delete({ id: id });
}

function manipulateData(datos: Array<any>) {
    datos.map((data) => {
        data.owner = data.owner.name;
        data.category = data.category.name;
        data.city = data.city.name;
        return data;
    });
    return datos;
}
