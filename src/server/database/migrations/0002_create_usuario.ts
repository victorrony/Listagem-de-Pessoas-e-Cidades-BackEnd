import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.usuario, table => {
      table.bigIncrements("id").primary().index();
      table.string("name").notNullable().checkLength(">=", 3);
      table.string("email").index().unique().notNullable().checkLength(">=", 5);
      table.string("password", 255).notNullable().checkLength(">=", 6); // Increased length

      table.comment("table usado para armazenar usuarios do sistema.");
    })
    .then(() => {
      console.log(`#created table ${ETableNames.usuario}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.usuario).then(() => {
    console.log(`# droped table ${ETableNames.usuario}`);
  });
}
