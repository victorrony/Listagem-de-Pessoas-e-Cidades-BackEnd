import { IUsuario } from "../../models/Usuario";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { PasswordCrypto } from "../../../shared/services";

export const create = async (
  usuario: Omit<IUsuario, "id">
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

    const [result] = await Knex(ETableNames.usuario)
      .insert({ ...usuario, senha: hashedPassword })
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Error ao cadastrar o registro");
  } catch (error) {
    console.log(error);
    return Error("Error ao cadastrar o registro");
  }
};
