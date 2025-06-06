import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtService } from '../services';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      Errors: { default: 'Nao authenticado3' },
    });
  }

  const [type, token] = authorization.split(' ');
  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      Errors: { default: 'Nao authenticado2' },
    });
  }

  const jwtData = JwtService.verify(token);
  if (jwtData === 'JWT_SECRET_NOT_FOUND') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      Errors: { default: 'Erro ao verificar o token' },
    });
  } else if (jwtData === 'INVALID_TOKEN') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      Errors: { default: 'Nao autenticado1.' },
    });
  }
  console.log(jwtData);
  req.headers.idUsuario = jwtData.uid.toString();

  return next();
};
