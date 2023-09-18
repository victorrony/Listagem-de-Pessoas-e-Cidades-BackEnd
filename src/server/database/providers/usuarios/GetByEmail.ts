import { IUsuario } from './../../models/Usuario';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';



export const getByEmail = async (email: string): Promise <IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return new Error('Registro nao encontrado');
  } catch (error) {
    console.log(error);
    return Error('Error ao cadastrar o registro');
  }
}; 