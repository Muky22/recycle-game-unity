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
  console.log('Connected');
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
  });
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});

export class App {
  static sockets = [];
}
