import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import './shared/services/TranslationsYup';
import { router } from './routes/index';

const server = express();

server.use(cors({
  origin: process.env.ENABLED_CORS?.split(';') || []
}));

server.use(express.json());

server.use(router);

export { server };
