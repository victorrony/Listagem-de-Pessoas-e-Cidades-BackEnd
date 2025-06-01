import { Knex } from './server/database/knex';
import { server } from './server/server';

const startServer = () => {
  server.listen(process.env.PORT || 3335, () => {
    console.log(`App rodando na porta ${process.env.PORT || 3335}`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  console.log('Rodando migrations');

  Knex.migrate
    .latest()
    .then(() => {
      console.log('Migrations executadas com sucesso!');
      Knex.seed
        .run()
        .then(() => {
          console.log('Seeds executadas com sucesso!');
          startServer();
        })
        .catch((err) => {
          console.error('Erro ao executar seeds:', err);
        });
    })
    .catch((err) => {
      console.error('Erro ao executar migrations:', err);
    });
} else {
  console.log('Iniciando servidor sem executar migrations...');
  startServer();
}
