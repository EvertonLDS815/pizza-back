import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    // Validar esse token

    const { sub } = verify(token, process.env.SECRET_JWT) as Payload;

    //recuperar o id do token e colocar numa variavel user_id para o req
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
