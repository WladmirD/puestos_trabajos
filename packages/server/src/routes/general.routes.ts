import { Router } from 'express';
import passport from 'passport';

import { signUp, logIn } from '../controllers/user.controller';
import { findPag, updatePag } from '../controllers/configuration.controller';
import { updateCategoryById, getAllCategory } from '../controllers/category.controller';
import { isAdmin } from '../middlewares/isWho';
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
        this.router.get(
            '/pagination',
            passport.authenticate('jwt', { session: false }),
            isAdmin,
            findPag,
        );
        this.router.put(
            '/pagination',
            passport.authenticate('jwt', { session: false }),
            isAdmin,
            updatePag,
        );
        this.router.delete('/category/:id',passport.authenticate('jwt', { session: false }),
        isAdmin, updateCategoryById);
        this.router.get('/category', getAllCategory)
        this.router.use('/', jobRoutes);
    }
}
const router = new UserRoutes().router;

export default router;
