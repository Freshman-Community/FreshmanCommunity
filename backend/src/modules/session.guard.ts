import { NextFunction, Response } from 'express';

export function sessionGuard(req, res: Response, next: NextFunction) {
  if (req.user === undefined) {
    res.send(`
      <script type="text/javascript">
        alert("로그인이 필요합니다.");
        window.location = '/signin.html';
      </script>
    `);
    res.status(401).send('Unauthorized');
  }
  next();
}
