import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - updateById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ nome: "Teste" });

    cidadeId = resCidade.body;
  });

  it("Atualizar Registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId,
      nomeCompleto: "victorrony89@gmail.com",
      email: "victorrony89@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/pessoa/${res1.body}`).send({
      cidadeId,
      nomeCompleto: "victorrony89@gmail.com",
      email: "victorfernandes89@gmail.com",
    });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta Atualizar registo que nao existe", async () => {
    const rest1 = await testServer
      .put("/pessoas/99999")
      .send({ nome: "picos" });

    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty("errors.default");
  });
});
