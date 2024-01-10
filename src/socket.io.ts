// const http = require('http');
// const { Server } = require('socket.io');

// const server = http.createServer();
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle your socket events here, e.g., socket.on('message', ...)
//   // Emit events using socket.emit or io.emit

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = 3001;
// server.listen(PORT, () => {
//   console.log(`Socket.IO server listening on http://localhost:${PORT}`);
// });
