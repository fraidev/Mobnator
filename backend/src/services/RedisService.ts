import redis from 'redis'
import { promisify } from 'util'

export const client = redis.createClient()
export const getAsync = promisify(client.get).bind(client)
client.on('error', function (error) {
  console.error(error)
})  
