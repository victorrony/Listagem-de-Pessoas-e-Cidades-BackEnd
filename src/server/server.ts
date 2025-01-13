import express from "express";
import "dotenv/config";
import cors from "cors";
import "./shared/services/TranslationsYup";
import { router } from "./routes/index";

const server = express();

server.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

server.use(express.json());

server.use(router);

export { server };
