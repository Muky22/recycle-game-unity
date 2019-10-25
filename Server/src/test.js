const io = require('socket.io-client');
const socket = io('http://localhost:4000/');

socket.on('connect', () => {
  console.log('Connected');
  setTimeout(() => {
    socket.emit('autoAuth', { devId: 'test', nick: 'test' });
  }, 1000);

  socket.on('getLeaderboardRes', data => {
    console.log(JSON.stringify(data, null, 4));
    process.exit(0);
  });

  socket.on('autoAuthRes', () => {
    console.log('Login');

    socket.emit('getLeaderboard');
  });
});
