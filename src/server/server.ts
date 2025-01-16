import express from "express";
import "dotenv/config";
import cors from "cors";
import "./shared/services/TranslationsYup";
import { router } from "./routes";
import { setupSwagger } from "./shared/services/swaggerConfig";

const server = express();

server.use(
  cors({
    origin: ["http://localhost:3000", "https://listagem-de-pessoas-e-cidades-front-end.vercel.app"],
  })
);

server.use(express.json());

server.use(router);

// Configurar Swagger
setupSwagger(server);

export { server };
