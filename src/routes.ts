import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUsercontroller';

const router = Router();

// rotas user
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

export { router };
