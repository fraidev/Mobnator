import server from './server';
import socketIo from 'socket.io';
import sockets from './services/Socket';

server.listen(5002, () => {
  console.log(`[SERVER] Running at http://localhost:5002`);
});


const socket = socketIo.listen(5004);
socket.sockets.on('connection', sockets);
