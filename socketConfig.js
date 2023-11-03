// socketConfig.js
const { Server: SocketServer } = require('socket.io');

function configureSocket(server) {
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(socket.id);
    console.log('a user connected');
  });

  return io;
}

module.exports = configureSocket;
