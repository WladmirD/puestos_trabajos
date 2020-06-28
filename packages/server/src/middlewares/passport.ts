import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import errorException from '../utils/errors';
import { findById } from '../repositories/user';

import config from '../config/index';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await findById(payload.id);
        const { exp } = payload;
        if (exp < Date.now()) {
            if (user) {
                return done(null, user);
            }
            return done(null, false, { message: 'The token is expired.' });
        }
        return done(null, false, { message: 'Unauthorized.' });
    } catch (err) {
        throw new errorException(500, err);
    }
});
