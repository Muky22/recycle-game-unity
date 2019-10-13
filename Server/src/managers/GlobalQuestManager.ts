import * as path from 'path';
import * as fs from 'fs';
import { App } from '../app';

export class GlobalQuestManager {
  static total = null;
  static saveProcess = null;

  constructor(private socket) {
    this.register();
    this.loadTotal();

    if (GlobalQuestManager.saveProcess === null) {
      GlobalQuestManager.saveProcess = setInterval(async () => {
        await GlobalQuestManager.saveTotal();
      }, 60000);
    }
  }

  static saveTotal() {
    fs.writeFileSync(
      path.join(__dirname, '../../private', 'global.txt'),
      GlobalQuestManager.total.toString(),
    );
  }

  async loadTotal() {
    const res = fs
      .readFileSync(path.join(__dirname, '../../private', 'global.txt'))
      .toString();
    GlobalQuestManager.total = +res;
  }

  register() {
    this.socket.data.globalQuestOpened = false;

    this.socket.on('enableGlobalQuest', () => {
      this.socket.data.globalQuestOpened = true;
    });

    this.socket.on('disableGlobalQuest', () => {
      this.socket.data.globalQuestOpened = false;
    });

    this.socket.on('getGlobalQuest', () => {
      this.socket.emit('getGlobalQuestRes', {
        progress: GlobalQuestManager.total,
      });
    });
  }

  addProgress() {
    GlobalQuestManager.total += 1;

    App.sockets.forEach(c => {
      if (c.data.globalQuestOpened) {
        c.emit('globalQuestChanged', { progress: GlobalQuestManager.total });
      }
    });
  }
}
