// import { Knex } from './server/database/knex';
import { server } from './server/server';

const PORTA = 3333;

server.listen(process.env.PORT || 3333, () => console.log(`App rodando! na porta ${PORTA}`));


// if (process.env.IS_LOCALHOST  !== 'true') {
//   console.log('Rodando migration');

//   Knex.migrate
//     .latest();
//     .then(() => {
//       Knex.seed.run()
//         .then(() => startServer())
//         .catch(console.log);
//     })
//     .catch(console.log)
// }else {
//   startServer();
// }