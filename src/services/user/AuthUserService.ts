import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar se o email existe

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { error: 'User/Password incorrect!' };
    }

    // Preciso verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return { error: 'User/Password incorrect!' };
    }

    return { ok: true };
  }
}

export { AuthUserService };
