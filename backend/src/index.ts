import { redisService } from "./services/RedisService";
import expressApplication from "./expressApplication";
import sockets from "./services/Socket";
import http from "http";

async function main() {
  const redis = await redisService(process.env.REDIS_URL as string);
  const server = http.createServer(expressApplication(redis));

  const io = require('socket.io')(server);

  io.on('connection', sockets(redis))

  server.listen(5004);
}

main().catch((error) => console.log(error));
