import { Socket } from 'socket.io'
import { RedisClientType } from 'redis'

// export function for listening to the socket
const sockets = (redis: RedisClientType<any, any, any>) => {
  return (socket: Socket) => {
    socket.on('UPDATE_STATE', function (data: { token: string, state: any }) {
      const state = JSON.stringify(data.state)
      redis.setEx(data.token, (60 * 60 * 24 * 7), state)
      socket.broadcast.emit(data.token, state)
    });
  };
}

export default sockets
