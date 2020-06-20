import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';

interface ILogin {
    email: string;
    password: string;
    type: string;
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
 * Finds in the database the record of the given entity that match the given user
 * @param user User to find the results. Must be in json format.
 * @return {ILogin} object found..
 */
export async function checkUser(user: User): Promise<User> {
    const result: User | any = await getRepository(User).find({
        select: ['email', 'password', 'type'],
        relations: ['type'],
        where: { email: user.email },
    });
    const userResult: ILogin | any = new Object();
    userResult['email'] = result[0].email;
    userResult['password'] = result[0].password;
    userResult['type'] = result[0].type.name;
    return userResult;
}
