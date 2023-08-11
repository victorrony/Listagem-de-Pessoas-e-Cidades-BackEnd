import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares/Validation";
import { IUsuario } from "../../database/models/Usuario";
import { UsuariosProvider } from "../../database/providers/usuarios";


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {};

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({    
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6)   
  })),  
}));


export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body;


  const result = await UsuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha sao invalidos'
      }
    });
  }
  
  if (senha !== result.senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha sao invalidos'
      }
    });
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste'})
  }
  
};