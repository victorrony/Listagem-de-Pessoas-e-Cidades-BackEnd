import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa).where('id', '=', id).del();

    if (result > 0) return;

    return new Error('Error ao apagar o registro');
  } catch (error) {
    console.log(error);
    return Error('Error ao apagar o registro');
  }
};
