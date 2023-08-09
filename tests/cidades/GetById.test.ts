import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - GetById', () => {

  it('Buscar Registro por id', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'tarrafal'})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resBuscada = await testServer
      .get(`/cidade/${res1.body}`)
      .send();

      expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
      expect(resBuscada.body).toHaveProperty('nome');
  })

  it('Tenta buscar registo que nao existe', async () => {

    const rest1 = await testServer.get('/cidades/55555')
      .send();

    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty('errors.default');
  });
})