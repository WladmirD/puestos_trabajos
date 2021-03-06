import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';

export interface IPassport {
    id: number;
    email: string;
    type: string;
}

export interface IUser extends IPassport {
    password: string;
    url: string;
}
/**
 *
 * @param user to create the User.
 * @return {object} user created.
 */
export async function createUser(user: User): Promise<User> {
    return await getRepository(User).save(user);
}
/**
 * Find in the database the record of the given entity that match the given user
 * @param email string
 * @return {ILogin} object found..
 */
export async function checkUser(email: string): Promise<IUser> {
    const [result]: User | any = await getRepository(User).find({
        select: ['id', 'email', 'password', 'type'],
        relations: ['type'],
        where: { email: email },
    });
    const userResult: IUser | any = new Object();
    userResult['id'] = result.id;
    userResult['email'] = result.email;
    userResult['password'] = result.password;
    userResult['type'] = result.type.name;
    userResult['url'] = result.url;
    return userResult;
}

/**
 * Find in the database the record of the given entity that match the given user
 * @param email
 * @return {IUser} object found..
 */
export async function findById(id: number): Promise<IUser> {
    const [result]: User | any = await getRepository(User).find({
        select: ['id', 'email', 'type'],
        relations: ['type'],
        where: { id: id },
    });
    const userResult: IPassport | any = new Object();
    userResult['id'] = result.id;
    userResult['email'] = result.email;
    userResult['type'] = result.type.name;
    return userResult;
}
