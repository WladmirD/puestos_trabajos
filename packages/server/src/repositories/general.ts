import { getRepository } from 'typeorm';
import { Role } from '../entity/role.entity';

/**
 *
 * @param type to find of id of that.
 * @return id of that object.
 */
export async function getRole(type: string): Promise<number> {
    const { id }: number | any = await getRepository(Role).findOne({ name: type });
    return id;
}