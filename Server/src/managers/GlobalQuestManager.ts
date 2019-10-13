import { App } from '../app';

export class GlobalQuestManager {
  static total = null;
  constructor(private socket) {
    this.register();
    this.loadTotal();

    setInterval(async () => {
      await this.saveTotal();
    }, 60000);
  }

  async saveTotal() {}

  async loadTotal() {
    GlobalQuestManager.total = 500000;
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
