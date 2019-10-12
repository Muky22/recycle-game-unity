import * as express from "express";
import * as http from "http";
import * as socketIO from "socket.io";
import * as dotenv from "dotenv";
import { AuthManager } from "./managers/AuthManager";
import { GameManager } from "./managers/GameManager";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(http);

const port = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.json({success: true});
});

io.on('connection', function(socket) {
    socket.data = {};

    socket.data.AuthManager = new AuthManager(socket);
    socket.data.GameManager = new GameManager(socket);
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});