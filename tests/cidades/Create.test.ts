import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"



describe('Cidades - Create', () => {


  it('Criar registo', async () => {

    const rest1 = await testServer
      .post('/cidades')
      .send({ nome: 'somada'});

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof rest1.body).toEqual('number');
  })

  it('Tenta criar um registo com nome muito curto', async () => {

    const rest1 = await testServer
      .post('/cidades')
      .send({ nome: 'so'});

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.nome');
  })

})