import { JwtService } from "../services";

interface ITokenPayload {
  userId: number;
}

export const generateAccessToken = (payload: ITokenPayload) => {
  const acessToken = JwtService.sign({ uid: payload.userId });
  if (acessToken === "JWT_SECRET_NOT_FOUND") {
    throw new Error("Erro ao gerar o token de acesso");
  }
  return acessToken;
};
