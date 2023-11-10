import cors from 'cors';
import express, { Application } from 'express';
import { AppDataSource } from './data-source';
import router from './routes';

const app: Application = express();
const PORT = process.env.PORT || 1010;

app.use(express.json());
app.use(cors());
app.use(router);

startBootstrap();

async function startBootstrap() {
   await AppDataSource.initialize()

  console.log('Connected DB');

  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}
