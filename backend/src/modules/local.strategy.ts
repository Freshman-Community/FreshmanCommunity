import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as usersService from '../services/users.service';
import { logger } from './logger';

async function strategyCallback(username: string, password: string, done) {
  if (await usersService.verifyUser(username, password)) {
    logger.info(`Sign Info: ${username} signed in`);
    return done(null, await usersService.selectUser(null, username, null));
  } else {
    logger.info(`Sign Info: ${username} failed to sign in`);
    return done(null, false);
  }
}

passport.serializeUser((username: string, done) => done(null, username));

passport.deserializeUser((obj, done) => done(null, obj));

export const LocalStrategy = () => new Strategy({}, strategyCallback);
