import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authUserService = new AuthUserService();

      const auth = await authUserService.execute({
        email,
        password,
      });

      return res.json(auth);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}

export { AuthUserController };
