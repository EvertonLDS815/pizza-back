import { Router, Request, Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
  res.json({
    message: 'server is running on port 3333',
  });
});

export { router };
