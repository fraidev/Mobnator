import server from './server';

server.listen(5002, () => {
  console.log(`[SERVER] Running at http://localhost:5002`);
});

