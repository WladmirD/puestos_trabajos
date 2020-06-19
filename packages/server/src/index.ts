
import Express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';


class App {
    public app: Application;

    constructor() {
        this.app = Express();
        this.plugins();
    }

    protected plugins(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(Express.urlencoded({ extended: false }));
        this.app.use(Express.json());
        this.app.use( rateLimit({ max: 100, windowMs: 30 * 60 * 1000 }));
    }
}
const app = new App().app;
const { port } = config;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
