import { Router } from 'express';
import passport from 'passport';

import { createJobCT, findJob, getJobs, deleteJobById } from '../controllers/job.controller';
import { isPoster, isAdmin } from '../middlewares/isWho';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.get('/jobs', getJobs);
        this.router.post(
            '/create',
            passport.authenticate('jwt', { session: false }),
            isPoster,
            createJobCT,
        );
        this.router.get('/jobs/:id', passport.authenticate('jwt', { session: false }), findJob);
        this.router.delete('/jobs/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteJobById);
    }
}
const router = new UserRoutes().router;

export default router;
