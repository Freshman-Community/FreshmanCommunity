import { Router } from 'express';
import * as passport from 'passport';
import * as usersController from '../controllers/users.controller';
import { env } from '../modules/env';
import { LocalStrategy } from '../modules/local.strategy';

export const path = '/api/user';
export const router = Router();

const passportOptions = {
  successRedirect: '/home.html',
  failureRedirect: '/signIn.html',
};

passport.use(LocalStrategy());

router.post(
  '/signin',
  passport.authenticate('local', passportOptions),
  usersController.signIn,
);
router.get('/signout', (req, res) => {
  req.logout();
  req.session.save(() => res.redirect('/home.html'));
});
router.post('/signup', usersController.signUp);

router.get('/', (req, res, next) => res.send(req.user));
router.get('/:nickname', usersController.getByNickname);
