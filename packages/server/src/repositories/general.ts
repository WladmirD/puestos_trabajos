import { getRepository } from 'typeorm';
import { Configuration } from '../entity/configuration.entity';
import { Category } from '../entity/category.entity';

/**
 *
 * @param type to find of id of that.
 * @return id of that object.
 */
export async function findId(type: string, entity: string | any): Promise<number> {
    const { id }: number | any = await getRepository(entity).findOne({ name: type });
    return id;
}

/**
 *
 * @return numPagination
 */

export async function findNumPag() {
    const { NumPagination }: number | any = await getRepository(Configuration).findOne(1);
    return NumPagination;
}

/**
 *
 * @param num type number
 * @return
 */
export async function updateNummPag(num: number) {
    return await getRepository(Configuration).update({ id: 1 }, { NumPagination: num });
}

/**
 * @param id type number
 * @return
 */
export async function updateCategory(id: number | any) {
    return await getRepository(Category).update({ id: id }, { isActive: false });
}

/**
 * @param
 * @return [] un array de la criteria entrada
 */
export async function getAll(criteria: any) {
    return await getRepository(criteria).find();
}
