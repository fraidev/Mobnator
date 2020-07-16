import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import stateControllerRouter from './controllers/StateController';

const server = () => {
  const expressApplication: express.Application = express();

  const middlewares = () => {
    expressApplication.use(bodyParser.json());
    expressApplication.use(bodyParser.urlencoded({ extended: true }));
    expressApplication.use(cors());
  }

  const routes = () => {
    expressApplication.use('/api', stateControllerRouter);
  }

  middlewares();
  routes();

  return { expressApplication };
}

export default server().expressApplication;