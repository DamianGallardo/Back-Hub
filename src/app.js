import express from 'express';
import moviesRouter from './routes/movies.routes.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';

const app = express();
// Configura CORS
app.use(cors({
    origin: 'http://localhost:4200' // Reemplaza con el origen que necesitas
  }));
app.use(moviesRouter);
app.use(authRouter);

export default app;

//Configuracon de express