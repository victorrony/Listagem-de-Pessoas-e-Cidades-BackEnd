import { create } from './../../src/server/controllers/cidades/Create';
import { getById } from '../../src/server/controllers/cidades/GetById';

import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"



describe('Cidades - GetAll', () => {

  it('Buscar todos os registros', async () => {

    const rest1 = await testServer
      .post('/cidades')
      .send({ nome: 'tarrafal'});

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);   
    
    const resBuscada = await testServer
      .get('/cidades')
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0); 
  });
})