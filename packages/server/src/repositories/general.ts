import { getRepository } from 'typeorm';

/**
 *
 * @param type to find of id of that.
 * @return id of that object.
 */
export async function findById(type: string, entity: string | any): Promise<number> {
    const { id }: number | any = await getRepository(entity).findOne({ name: type });
    return id;
}