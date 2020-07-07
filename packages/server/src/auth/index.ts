import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../entity/user.entity';
import config from '../config/index';
import errorException from '../utils/errors';

export async function generateToken(id: number, role: string): Promise<string> {
    const secretKey: string | any = config.jwtSecret;
    return await jwt.sign({ id: id, role: role }, secretKey, {
        expiresIn: '1h',
    });
}

export async function comparePassword(
    password: string,
    hashPassword: User['password'],
): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (err) {
        throw new errorException(500, 'Something wrong happened.');
    }
}

export async function hashedPassword(password: string): Promise<string> {
    const saltConfig: any = config.salt;
    const salt = await bcrypt.genSalt(parseInt(saltConfig));
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
