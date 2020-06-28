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
    const [result, total] = await getRepository(Job).findAndCount({
        select: ['id', 'posicion', 'address', 'city', 'created_time', 'owner', 'category'],
        relations: ['owner', 'category'],
        order: {
            created_time: 'DESC',
        },
        take: limit * pages,
        skip: (pages - 1) * limit,
    });
    const jobs = manipulateData(result)
    return { jobs, total: Math.ceil(total / limit) };
}

function manipulateData(datas : Array<any>) {
    datas.map(data => {
        if (data.category.isActive === true) {
            delete data.owner.id;
            delete data.owner.email;
            delete data.owner.roleId;
            delete data.owner.created_At;
            delete data.owner.password;
            data.owner = data.owner.name;
            delete data.category.id;
            data.category = data.category.name;
            return data;
        }
    })
    return datas;
}

