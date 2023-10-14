import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const createUserservice = new CreateUserService();

      const user = await createUserservice.execute({
        name,
        email,
        password,
      });
      return res.json(user);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}

export { CreateUserController };
