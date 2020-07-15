import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import stateControllerRouter from './controllers/StateController';

const server = () => {
  const expressApplication: express.Application = express();

  const middlewares = () => {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cors());
  }

  const routes = () => {
    this.express.use('/api', stateControllerRouter);
  }
  middlewares();
  routes();

  return { expressApplication };
}

export default server().expressApplication;