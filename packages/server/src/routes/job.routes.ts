import { Router } from 'express';
import passport from 'passport';
import multer from 'multer';

import {
    createJobCT,
    findJob,
    getJobs,
    deleteJobById,
    updateJob,
} from '../controllers/job.controller';
import { isPoster, isAdmin } from '../middlewares/isWho';
import midMulter from '../middlewares/multer';

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
            multer(midMulter).single('image'),
            createJobCT,
        );
        this.router.get('/jobs/:id', findJob);
        this.router.put(
            '/jobs/:id',
            passport.authenticate('jwt', { session: false }),
            isAdmin,
            multer(midMulter).single('image'),
            updateJob,
        );
        this.router.delete(
            '/jobs/:id',
            passport.authenticate('jwt', { session: false }),
            isAdmin,
            deleteJobById,
        );
    }
}
const router = new UserRoutes().router;

export default router;
