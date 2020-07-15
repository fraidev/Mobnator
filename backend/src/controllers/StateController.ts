import express from 'express';
import crypto from 'crypto'
import { getAsync, client } from 'src/services/RedisService';

const stateControllerRouter = express.Router();

stateControllerRouter.get('/token', async (req, res): Promise<void> => {
  try {
    const generateToken = crypto.randomBytes(5).toString('hex')

    const key = await getAsync(generateToken)
    if (key == null) {
      res.json(generateToken);
    }
    client.set('key', 'uiai')
    console.log(key)
    res.json(generateToken);

  } catch (err) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
    });
  }
});

stateControllerRouter.post('/share', async (req, res): Promise<void> => {
  try {
    const { token, state } = req.body;
    client.set(token, state)

    res.json({
      message: token,
      status: 200,
    });

  } catch (error) {
    res.status(error.status).json(error);
  }
});

export default stateControllerRouter;