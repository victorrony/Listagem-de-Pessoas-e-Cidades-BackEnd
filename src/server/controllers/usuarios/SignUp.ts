import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { IUsuario } from "../../database/models/Usuario";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { JwtService, PasswordCrypto } from "../../shared/services";
import * as yup from "yup";
import { generateAccessToken } from "../../shared/utils/AuthUtils";

interface IBodyProps extends Omit<IUsuario, "id"> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    })
  ),
}));

export const signUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const usuario = await UsuariosProvider.getByEmail(email);
    if (usuario && !(usuario instanceof Error)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: { default: "Email já cadastrado" } });
    }

    //hash password
    const hashedPassword = await PasswordCrypto.hashPassword(password);
    const userId = await UsuariosProvider.create({
      name,
      email,
      password: hashedPassword,
    });

    //check if user was created
    if (userId instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errors: { default: userId.message } });
    }

    // Generate access token with correct payload
    const accessToken = generateAccessToken({ userId: userId });
    return res
      .status(StatusCodes.CREATED)
      .json({ accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: { default: "Erro ao cadastrar o usuário" } });
  }
};
