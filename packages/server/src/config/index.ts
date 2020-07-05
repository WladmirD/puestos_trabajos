import dotenv from 'dotenv';

dotenv.config();
export default {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    salt: process.env.SALT_ROUND,
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
};
