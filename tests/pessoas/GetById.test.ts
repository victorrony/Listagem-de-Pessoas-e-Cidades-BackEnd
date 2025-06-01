import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - GetById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ nome: "Teste" });

    cidadeId = resCidade.body;
  });
  it("Buscar Registro por id", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId,
      nomeCompleto: "victorrony",
      email: "victorrony89@gmail.com"
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/pessoa/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nome");
  });

  it("Tenta buscar registo que nao existe", async () => {
    const rest1 = await testServer.get("/pessoas/55555").send();

    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty("errors.default");
  });
});
