const io = require('socket.io-client');

const socket = io('http://localhost:4000/');

const requestItem = () => {
  setTimeout(() => {
    console.log('Request ite,');
    socket.emit('requestItem');
  }, 1000);
};

socket.on('connect', () => {
  console.log('Connected');
  setTimeout(() => {
    socket.emit('autoAuth', { devId: 'test', nick: 'test' });
  }, 1000);

  socket.on('autoAuthRes', () => {
    console.log('Login');
    requestItem();
  });

  socket.on('requestItemRes', () => {
    socket.emit('answerItem', { answer: 'Blue' });
  });

  socket.on('answerItemRes', res => {
    console.log(res);
    requestItem();
  });
});
