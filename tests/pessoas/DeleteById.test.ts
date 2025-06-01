import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"



describe('Pessoas - DeleteById', () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ nome: "Teste" });

    cidadeId = resCidade.body;
  });

  it('Apagar Registo', async () => {

    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        nomeCompleto: 'juca silva',
        email: 'victorfernandes@gmail.com'
      })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resApagada = await testServer
      .delete(`/pessoa/${res1.body}`)
      .send();

      expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })

  it('Tenta apagar um registo que nao existe', async () => {

    const rest1 = await testServer
      .delete('/pessoas/99999')
      .send();

    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty('errors.default');
  })

})