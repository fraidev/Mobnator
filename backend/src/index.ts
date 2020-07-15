import server from './server';

server.listen(5004, () => {
  console.log(`[SERVER] Running at http://localhost:5004`);
});