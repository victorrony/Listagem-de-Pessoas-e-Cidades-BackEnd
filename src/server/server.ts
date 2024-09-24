import express from "express";
import "dotenv/config";
import cors from "cors";
import "./shared/services/TranslationsYup";
import { router } from "./routes/index";

const server = express();

server.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://listagem-de-pessoas-e-cidades-front-end.vercel.app",
    ],
  })
);

server.use(express.json());

server.use(router);

export { server };
