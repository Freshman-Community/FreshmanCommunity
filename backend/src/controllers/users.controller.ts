import { logger } from '../modules/logger';
import { Request, Response } from 'express';
import * as usersService from '../services/users.service';

export async function signIn(req, res: Response) {
  req.login();
  res.send(`
    <script type="text/javascript">
      alert("${req.user.username}님 안녕하세요!");
      window.location = document.referrer;
    </script>
  `);
}

export async function signUp(req: Request, res: Response) {
  const { username, password, nickname, major, enteredYear } = req.body;
  try {
    const userId = await usersService.createUser(
      username,
      password,
      nickname,
      major,
      enteredYear,
    );

    if (userId) {
      logger.info(`200 OK in (controller: user.signUp)`);
      res.status(200).redirect('/');
    } else {
      logger.error(`409 Conflict in (controller: user.signUp)`);
      res.status(409).send('409 Conflict');
    }
  } catch (error) {
    logger.error(`500 Internal error in (controller: user.signUp): ${error}`);
    res.status(500).send('500 Internal Error');
  }
}

export async function getByNickname(req: Request, res: Response) {
  const user = await usersService.selectUser(null, null, req.params.nickname);

  if (user) {
    res.json(user.toJSON());
  } else {
    res.status(404).send('Not found');
  }
}
