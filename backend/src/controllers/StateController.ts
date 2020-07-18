import express from 'express'
import crypto from 'crypto'
import { redisService } from './../services/RedisService'

const stateControllerRouter = express.Router()

stateControllerRouter.get('/state', async (req, res): Promise<void> => {
  try {
    const state = await redisService().getAsync(req.query.token)
    console.log(state)
    res.json(state)
  } catch (err) {
    res.status(err.status).json({
      message: err.message,
      status: err.status
    })
  }
})

stateControllerRouter.post('/share', async (req, res): Promise<void> => {
  try {
    const token = crypto.randomBytes(5).toString('hex')
    redisService().client.set(token, JSON.stringify(req.body))

    // console.log(req.body)
    res.json(token)
  } catch (error) {
    res.status(error.status).json(error)
  }
})

export default stateControllerRouter
