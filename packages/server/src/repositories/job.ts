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
    const [result]: Job | any = await getRepository(Job).find({
        select: [
            'posicion',
            'address',
            'url_logo',
            'description',
            'created_time',
            'category',
            'city',
            'owner',
            'type',
        ],
        relations: ['category', 'city', 'owner', 'type'],
        where: { id: id },
    });
    result.category = result.category.name;
    result.city = result.city.name;
    result.type = result.type.name;
    delete result.owner.password;
    delete result.owner.roleId;
    delete result.owner.created_At;
    delete result.owner.type;
    return result;
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
        .orderBy('job.created_time', 'DESC')
        .getMany();
    const jobs = manipulateData(result);
    return jobs;
}

export async function getJobCategory(category: string | any) {
    const result = await getRepository(Job)
        .createQueryBuilder('job')
        .select(['job.id', 'job.posicion', 'job.address', 'job.created_time'])
        .innerJoinAndSelect('job.category', 'category', 'category.isActive = :category', {
            category: true,
        })
        .innerJoinAndSelect('job.city', 'city')
        .innerJoinAndSelect('job.owner', 'owner')
        .where('category.name = :categoryName', { categoryName: category })
        .getMany();
    const jobs = manipulateData(result);
    return jobs;
}
export async function deleteJob(id: number | any) {
    return await getRepository(Job).delete({ id: id });
}

export async function updateJobById(job: Job, id: number | any) {
    return await getRepository(Job).update({ id: id}, job);
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
