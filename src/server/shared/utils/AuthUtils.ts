import { JwtService } from "../services";

interface ITokenPayload {
  userId: number;
}

export const generateAccessToken = (payload: ITokenPayload) => {
  const accessToken = JwtService.sign({ uid: payload.userId });
  console.log(`Generated Access Token Payload: { uid: ${payload.userId} }`); // Add logging
  if (accessToken === "JWT_SECRET_NOT_FOUND") {
    throw new Error("Erro ao gerar o token de acesso");
  }
  return accessToken;
};
