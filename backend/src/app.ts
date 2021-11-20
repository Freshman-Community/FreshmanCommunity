import * as express from 'express';
import session = require('express-session');
import * as passport from 'passport';
import { initializeSequelize } from './models';
import { env } from './modules/env';
import { LocalStrategy } from './modules/local.strategy';
import { logger } from './modules/logger';
import { router, path } from './routes/routes';

export const app = express();

(async () => {
  await (await initializeSequelize()).sync();
  logger.info('Database has been initialized successfully :)');
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: env.session.secret,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use((req, res, next) => {
  const { method, path } = req;
  logger.info(`${method} ${path}`);
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(path, router);
