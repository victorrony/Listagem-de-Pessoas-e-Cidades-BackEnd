import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { PessoasProviders } from '../../database/providers/pessoas';


interface IQueryProps {
  page?: number;
 limit?: number;
 filter?: string;
}

export const getAllValidation = validation(get => ({
  query: get<IQueryProps>(yup.object().shape({
    page: yup.number().optional().integer().moreThan(0).default(1),
    limit: yup.number().optional().moreThan(0).integer().default(7),    
    filter: yup.string().optional().default(''),
  })),  
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await PessoasProviders.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '');
  const count = await PessoasProviders.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader('acces-control-expose-headers', 'x-total-count');
  res.setHeader('X-Total-Count', count);

  return res.status(StatusCodes.OK).json(result);
};