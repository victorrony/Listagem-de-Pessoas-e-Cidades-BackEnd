import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares/Validation";
import { CidadesProviders } from "../../database/providers/cidades";


interface IParamProps {
  id?: number;  
};

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),   
  })),  
}));


export const getById = async (req: Request<IParamProps>, res: Response) => {
  
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
    errors: {
      default: 'O parametro "id" precisa ser informado.'
    }
  });
  };

  const result = await CidadesProviders.getById(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }
  
  return res.status(StatusCodes.OK).json(result);
};