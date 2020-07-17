import expressApplication from './expressApplication'
import socketIo from 'socket.io'
import sockets from './services/Socket'
import { Server } from 'http'

const server = new Server(expressApplication)

socketIo.listen(server)
  .sockets.on('connection', sockets)

server.listen(5004)
