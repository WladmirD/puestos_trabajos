import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { createUser, checkUser, IUser } from '../repositories/user';
import { comparePassword, hashedPassword, generateToken } from '../auth/index';
import errorException from '../utils/errors';
import { findById } from '../repositories/general';



export async function signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { name, email, password, role, url} = req.body;
        if (!name || !email || !password || !role || !url) {
            throw new errorException(400, 'Missing parameters');
        }
        const user: User | any = new Object();
        user['name'] = name;
        user['email'] = email;
        user['password'] = await hashedPassword(password);
        user['roleId'] = await findById(role, Role);
        user['url'] = url;
        await createUser(user);
        return res.status(201).json({ message: "Created" });
    } catch (err) {
        next(err);
    }
}

export async function logIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { email, password } = req.body;
        if ( !email || !password) {
            throw new errorException(404, 'Missing parameters.');
        }
        const user: IUser = await checkUser(email);
        if (!user) {
            throw new errorException(404, 'Not found that user.');
        }
        const check: boolean = await comparePassword(password,user.password);
        if(!check) {
            throw new errorException(401,"Bad authentication.");
        }
        res.status(200).json({ token: await generateToken(user.id, user.type), user});
    } catch(err) {
        next(err);
    }
}