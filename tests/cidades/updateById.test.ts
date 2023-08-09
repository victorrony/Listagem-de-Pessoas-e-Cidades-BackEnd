import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"



describe('Cidades - updateById', () => {

  it('Atualizar Registro', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'somada'})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resAtualizada = await testServer
      .put(`/cidade/${res1.body}`)
      .send({ nome: 'picos'});

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);      
  })

  it('Tenta Atualizar registo que nao existe', async () => {

    const rest1 = await testServer
      .put('/cidades/99999')
      .send({ nome: 'picos'});

    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty('errors.default');
  })
})