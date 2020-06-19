import dotenv from 'dotenv';

dotenv.config();
export default {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    salt: process.env.SALT_ROUND,
};