import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/createUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserservice = new CreateUserService();

    const user = await createUserservice.execute({
      name,
      email,
      password,
    });
    return res.json(user);
  }
}

export { CreateUserController };
