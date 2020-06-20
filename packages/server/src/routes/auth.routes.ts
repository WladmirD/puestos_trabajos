import { Router } from 'express';

import { signUp } from '../controllers/user';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.post('/register', signUp);
    }
}
const router = new UserRoutes().router;

export default router;
