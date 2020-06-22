import { getRepository } from 'typeorm';
import { Job } from '../entity/job.entity';

/**
 *
 * @param job Job to find of object of that.
 * @return Job
 */
export async function createJob(job: Job): Promise<Job> {
    return await getRepository(Job).save(job);
}