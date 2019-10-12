import { App } from '../app';

export class GlobalQuestManager {
  static total = null;
  constructor(private socket) {
    GlobalQuestManager.total = 0;

    this.register();
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
    GlobalQuestManager.total++;

    App.getSocketServer()
      .sockets.clients()
      .forEach(c => {
        if (c.data.globalQuestOpened) {
          c.emit('globalQuestChanged', { progress: GlobalQuestManager.total });
        }
      });
  }
}
