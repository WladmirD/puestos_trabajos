import { Router } from 'express';

import { signUp, logIn } from '../controllers/user';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.post('/register', signUp);
        this.router.post('/logIn', logIn);
    }
}
const router = new UserRoutes().router;

export default router;
