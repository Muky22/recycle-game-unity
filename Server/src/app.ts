import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import * as dotenv from 'dotenv';
import { AuthManager } from './managers/AuthManager';
import { GameManager } from './managers/GameManager';
import { LevelManager } from './managers/LevelManager';
import { GlobalQuestManager } from './managers/GlobalQuestManager';
import { SQL } from './classes/SQL';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 5000;

SQL.getInstance();

app.get('/', function(req, res) {
  res.json({ success: true });
});

io.on('connection', function(socket) {
  App.sockets.push(socket);

  socket.data = {};
  socket.data.AuthManager = new AuthManager(socket);

  socket.on('disconnect', async () => {
    if (socket.data.LevelManager) {
      await socket.data.LevelManager.saveLevel();
    }

    const index = App.sockets.indexOf(socket);
    if (index !== -1) {
      App.sockets.splice(index, 1);
    }

    socket.data = null;
  });
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});

export class App {
  static sockets = [];
}

const exitHandler = async (options, exitCode) => {
  GlobalQuestManager.saveTotal();

  const promises = App.sockets.map(async socket => {
    await socket.data.LevelManager.saveLevel();
  });

  await Promise.all(promises);
  process.exit();
};

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
