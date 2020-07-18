import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import stateControllerRouter from './controllers/StateController'

const server = () => {
  const expressApplication = express()

  const middlewares = () => {
    expressApplication.use(bodyParser.json())
    expressApplication.use(bodyParser.urlencoded({ extended: true }))
    const corsOptions = {
      origin: '*',
      optionsSuccessStatus: 200
    }
    expressApplication.use(cors(corsOptions))
  }

  const routes = () => {
    expressApplication.use('/api', stateControllerRouter)
  }

  middlewares()
  routes()

  return { expressApplication }
}

export default server().expressApplication
