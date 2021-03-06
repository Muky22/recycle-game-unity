import { Items, Item } from '../classes/Items';
import { SQL } from '../classes/SQL';
import { App } from '../app';

export class GameManager {
  private hasItem = false;
  private item: Item = null;

  constructor(private socket) {
    this.register();
  }

  register() {
    this.socket.on('requestItem', () => {
      if (this.hasItem) {
        return;
      }

      this.item = Items.getRandomItem(this.socket);
      this.hasItem = true;

      this.socket.emit('requestItemRes', {
        item: this.item.tag,
        lang: this.item.lang,
      });
    });

    this.socket.on('answerItem', async (data: { answer: string }) => {
      if (!this.hasItem && this.item) {
        return;
      }

      const uidQuery = SQL.knex
        .select(['id'])
        .from('users')
        .where('dev_id', this.socket.data.devId);

      const isCorrecct = this.item.correctAnswer === data.answer;

      await SQL.knex
        .insert({
          u_id: uidQuery,
          item: this.item.tag,
          answer: data.answer,
          correct_answer: this.item.correctAnswer,
          correct: isCorrecct ? 1 : 0,
        })
        .into('answers');

      if (isCorrecct) {
        this.socket.data.LevelManager.onCorrectAnswer();
        this.socket.data.GlobalQuestManager.addProgress();
        this.socket.emit('answerItemRes', { correct: true });
      } else {
        this.socket.data.LevelManager.onWrongAnswer();
        this.socket.emit('answerItemRes', { correct: false });
      }

      this.item = null;
      this.hasItem = false;

      App.sockets.forEach(c => {
        c.emit('anyoneSeparate', { correct: isCorrecct });
      });
    });
  }
}
