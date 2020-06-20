import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity';
import { createUser, checkUser } from '../repositories/user';
import { comparePassword, hashedPassword } from '../auth/index';
import errorException from '../utils/errors';
import { getRole } from '../repositories/general';



export async function signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { name, email, password, role, url} = req.body;
        if (!name || !email || !password || !role || !url) {
            throw new errorException(404, 'Missing parameters');
        }
        const user: User | any = new Object();
        user['name'] = name;
        user['email'] = email;
        user['password'] = await hashedPassword(password);
        user['roleId'] = await getRole(role);
        user['url'] = url;
        const result = await createUser(user);
        return res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}