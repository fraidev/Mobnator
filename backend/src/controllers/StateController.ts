import express from 'express';
import crypto from 'crypto'
import socket from 'src/services/Socket';
import { getAsync, client } from 'src/services/RedisService';

const stateControllerRouter = express.Router();

stateControllerRouter.get('/state', async (req, res): Promise<void> => {
  try {
    const state = await getAsync(req.body)
    console.log(state)
    res.json(state)

  } catch (err) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
    });
  }
});

stateControllerRouter.post('/share', async (req, res): Promise<void> => {
  try {
    const token = crypto.randomBytes(5).toString('hex')
    client.set(token, JSON.stringify(req.body))
    socket.on(token, function (data) {
      client.set(token, JSON.stringify(data))
      console.log(data);
    });
    console.log(req.body)
    res.json(token);

  } catch (error) {
    res.status(error.status).json(error);
  }
});

export default stateControllerRouter;