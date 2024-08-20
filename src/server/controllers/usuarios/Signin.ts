import { PasswordCrypto } from "../../shared/services/PasswordCrypto";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { IUsuario } from "../../database/models/Usuario";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { JwtService } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      senha: yup.string().required().min(6),
    })
  ),
}));

// export const signIn = async (
//   req: Request<{}, {}, IBodyProps>,
//   res: Response
// ) => {
//   const { email, senha } = req.body;

//   const usuario = await UsuariosProvider.getByEmail(email);
//   //console.log(usuario);

//   if (usuario instanceof Error) {
//     return res.status(StatusCodes.UNAUTHORIZED).json({
//       errors: {
//         default: 'Email invalidos',
//       },
//     });
//   }

//   const passwordMatch = await PasswordCrypto.verifyPassword(
//     senha,
//     usuario.senha
//   );

//   if (!passwordMatch) {
//     return res.status(StatusCodes.UNAUTHORIZED).json({
//       errors: {
//         default: 'Senha invalidos',
//       },
//     });
//   } else {
//     const accessToken = JwtService.sign({ uid: usuario.id });
//     if (accessToken === 'JWT_SECRET_NOT_FOUND') {
//       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//         errors: {
//           default: 'Erro ao gerar o token de acesso',
//         },
//       });
//     }

//     return res.status(StatusCodes.OK).json({ accessToken });
//   }
// };

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, senha } = req.body;

  try {
    const usuario = await UsuariosProvider.getByEmail(email);
    if (usuario instanceof Error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ errors: { default: "Email invalidos" } });
    }
    const passwordMatch = await PasswordCrypto.verifyPassword(
      senha,
      usuario.senha
    );
    if (!passwordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ errors: { default: "Senha invalidos" } });
    }
    const accessToken = JwtService.sign({ uid: usuario.id });
    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errors: { default: "Erro ao gerar o token de acesso" } });
    }
    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: { default: "Erro interno do servidor" } });
  }
};
