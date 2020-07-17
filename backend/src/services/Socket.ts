import { Socket } from 'socket.io';
import { client } from './RedisService';


// export function for listening to the socket
const sockets = (socket: Socket) => {

  socket.on('UPDATE_STATE', function (data: { token: string, state: any }) {
    const state = JSON.stringify(data.state)
    client.set(data.token, state)
    socket.broadcast.emit(data.token, state)
  });
};


export default sockets