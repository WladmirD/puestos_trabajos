import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../images'),
    filename: (req: any, file: any, cb: any) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const midMulter = {
    storage,
    limits: { fileSize: 1000000 },
};

export default midMulter;
