import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as create from './Create';
import * as deleteById from './DeleteById';
import * as count from './Count'


export const PessoasProviders = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
  ...count
};