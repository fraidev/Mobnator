import redis from 'redis'
import { promisify } from 'util'

export const redisService = () => {
  const client = redis.createClient()
  const getAsync = promisify(client.get).bind(client)
  client.on('error', function (error) {
    console.error(error)
  })

  return { client, getAsync }
}

export default redisService()
