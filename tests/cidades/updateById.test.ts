import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - updateById", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "updatebyid-cidades@gmail.com";
    await testServer
      .post("/cadastrar")
      .send({ email, senha: "123456", nome: "Teste" });
    const signInRes = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Tenta atualizar sem usar token de autenticação", async () => {
    const res1 = await testServer
    .put("/cidades/1")
    .send({ nome: "Teste" });
     
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Atualizar Registro", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "somada" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/cidade/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "picos" });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta Atualizar registo que nao existe", async () => {
    const res1 = await testServer
      .put("/cidades/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "picos" });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
