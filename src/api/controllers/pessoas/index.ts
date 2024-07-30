
import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as create from './Create';
import * as deleteById from './DeleteById';


export const PessoasController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById
};