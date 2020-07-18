import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import stateControllerRouter from './controllers/StateController'

const server = () => {
  const expressApplication = express()

  const middlewares = () => {
    expressApplication.use(bodyParser.json())
    expressApplication.use(bodyParser.urlencoded({ extended: true }))

    expressApplication.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', 'https://mobnator.com https://www.mobnator.com https://be.mobnator.com')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
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
