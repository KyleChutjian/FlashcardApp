import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

import { router as usersRouter } from './routes/users';
import { router as collectionsRouter } from './routes/collections';
import { router as flashcardsRouter } from './routes/flashcards';

const app: Express = express();
const port = process.env.SERVER_PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const API_PREFIX = '/api';
app.use(`${API_PREFIX}/users`, usersRouter);
app.use(`${API_PREFIX}/collections`, collectionsRouter);
app.use(`${API_PREFIX}/flashcards`, flashcardsRouter);

app.listen(port, () =>
  console.log(`🚀 Server listening at http://localhost:${port}`)
);