import express from 'express';
import moviesRouter from './routes/movies.routes.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
// Configura CORS
app.use(cors({
    origin: process.env.PORT_ANGULAR // URL de Angular
  }));
app.use(moviesRouter);
app.use(authRouter);

export default app;

//Configuracon de express