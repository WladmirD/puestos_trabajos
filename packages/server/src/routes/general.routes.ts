import { Router } from 'express';

import { signUp, logIn } from '../controllers/user.controller';
import jobRoutes from './job.routes';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.post('/register', signUp);
        this.router.post('/logIn', logIn);
        this.router.use('/', jobRoutes);
    }
}
const router = new UserRoutes().router;

export default router;
