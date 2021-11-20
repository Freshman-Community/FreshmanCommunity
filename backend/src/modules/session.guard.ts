import { NextFunction, Response } from 'express';

export function sessionGuard(req, res: Response, next: NextFunction) {
  if (req.user === undefined) {
    res.status(401).send('Unauthorized');
  }
  next();
}
