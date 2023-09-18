import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {      // cryptografar a senha
  const saltGenerated = await genSalt(SALT_RANDOMS);

  return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hashedPassword: string) => {     // verificar a senha se estar correta
  return await compare(password, hashedPassword);
};


export const PasswordCrypto = {
  hashPassword,
  verifyPassword
};
