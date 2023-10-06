import { Router } from 'express';
import multer from 'multer';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUsercontroller';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListcategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

// rotas user
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// rotas category
router.post(
  '/category',
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// rotas product
router.post(
  '/product',
  isAuthenticated,
  upload.single('file'),
  new CreateProductController().handle
);
router.get(
  '/category/product',
  isAuthenticated,
  new ListByCategoryController().handle
);

// rotas order
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
export { router };
