import Express, { Application } from 'express';
import cors from 'cors';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import passport from 'passport';

import config from './config/index';
import authRouter from './routes/general.routes';
import handleErrors from './middlewares/handleErrors';
import passportMiddleware from './middlewares/passport';

class App {
    public app: Application;

    constructor() {
        this.app = Express();
        this.plugins();
        this.db();
        this.routes();
        this.uploadPhoto();
        this.errors();
    }

    protected plugins(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(Express.urlencoded({ extended: false }));
        this.app.use(Express.json());
        this.app.use(rateLimit({ max: 100, windowMs: 30 * 60 * 1000 }));
        this.app.use(passport.initialize());
        passport.use(passportMiddleware);
    }

    protected async db(): Promise<void> {
        await createConnection();
    }

    protected routes(): void {
        this.app.use('/api', authRouter);
    }

    protected uploadPhoto(): void {
        cloudinary.v2.config(config.cloudinary);
    }

    protected errors(): void {
        this.app.use(handleErrors);
    }
}
const app = new App().app;
const { port } = config;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
