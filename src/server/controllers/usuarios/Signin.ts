import { PasswordCrypto } from "../../shared/services/PasswordCrypto";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { generateAccessToken } from "../../shared/utils/AuthUtils";

interface IBodyProps {
  email: string;
  password: string;
}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),

    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const usuario = await UsuariosProvider.getByEmail(email);
    if (usuario instanceof Error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ errors: { default: "Email invalidos" } });
    }

    console.log(`Stored Hashed Password: ${usuario.password}`); // Add logging

    const passwordMatch = await PasswordCrypto.verifyPassword(
      password,
      usuario.password
    );
    console.log(`Password Match: ${passwordMatch}`); // Add logging

    if (!passwordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ errors: { default: "Senha invalidos" } });
    }

    // Generate token
    const accessToken = generateAccessToken({ userId: usuario.id });
    console.log(`Access Token: ${accessToken}`); // Add logging
    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errors: { default: "Erro ao gerar o token de acesso" } });
    }
    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: { default: "Erro interno do servidor" } });
  }
};
