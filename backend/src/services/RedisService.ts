import redis from 'redis'
import { promisify } from 'util'

export const redisService = () => {
  const client = redis.createClient({
    host: 'redis',
    port: 6379
  })
  const getAsync = promisify(client.get).bind(client)
  client.on('error', function (error) {
    console.error(error)
  })

  return { client, getAsync }
}

export default redisService()
