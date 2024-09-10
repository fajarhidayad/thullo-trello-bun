import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { errorHandler, errorNotFound } from './handlers/error.handler';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Working 100%',
  });
});

app.use('/api', router);

app.use(errorNotFound);
app.use(errorHandler);

export default app;
