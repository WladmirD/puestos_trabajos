import { Router } from 'express';
import passport from 'passport';

import { createJobCT, findJob } from '../controllers/job.controller';
import { isPoster } from '../middlewares/isWho';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.post('/create', passport.authenticate('jwt', { session: false }),isPoster, createJobCT);
        this.router.get('/jobs/:id', passport.authenticate('jwt', { session: false }), findJob);
    }
}
const router = new UserRoutes().router;

export default router;