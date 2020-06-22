import { Router } from 'express';
import passport from 'passport';

import { createJobCT } from '../controllers/job.controller';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.post('/create', passport.authenticate('jwt', { session: false }), createJobCT);
    }
}
const router = new UserRoutes().router;

export default router;