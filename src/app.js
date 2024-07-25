import express from 'express';
import moviesRouter from './routes/movies.routes.js';
import authRouter from './routes/auth.routes.js';


const app = express();
app.use(moviesRouter);
app.use(authRouter);

export default app;

//Configuracon de express