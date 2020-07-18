import { Socket } from 'socket.io'
import { redisService } from './RedisService'

// export function for listening to the socket
const sockets = (socket: Socket) => {
  socket.on('UPDATE_STATE', function (data: { token: string, state: any }) {
    const state = JSON.stringify(data.state)
    redisService().client.setex(data.token, (60 * 60 * 24 * 7), state)
    socket.broadcast.emit(data.token, state)
  })
}

export default sockets
