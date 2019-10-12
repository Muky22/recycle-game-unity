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
const io = socketIO(http);

const port = process.env.PORT || 5000;

SQL.getInstance();

app.get('/', function(req, res) {
  res.json({ success: true });
});

io.on('connection', function(socket) {
  console.log('Connected');
  socket.data = {};

  socket.data.AuthManager = new AuthManager(socket);
  socket.data.GameManager = new GameManager(socket);
  socket.data.LevelManager = new LevelManager(socket);
  socket.data.GlobalQuestManager = new GlobalQuestManager(socket);
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});

export class App {
  static getSocketServer() {
    return io;
  }
}
