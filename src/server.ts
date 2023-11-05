import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';
import 'express-async-errors';
import cors from 'cors';
import path from 'node:path';

const port = process.env.PORT || 3333;
const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // se for uma instancia do tipo erro

    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(port, () => console.log(`Server is running: http://localhost:${port}`));
