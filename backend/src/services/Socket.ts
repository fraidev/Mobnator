import socketIo, { Socket } from 'socket.io';

const socket = socketIo.listen(5004);

// export function for listening to the socket
const sockets = (socket: Socket) => {

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    console.log(data);
  });
};

socket.sockets.on('connection', sockets);

export default socket