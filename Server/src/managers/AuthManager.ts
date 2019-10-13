import { SQL } from '../classes/SQL';
import { GameManager } from './GameManager';
import { LevelManager } from './LevelManager';
import { GlobalQuestManager } from './GlobalQuestManager';
import { Utils } from '../Utils';
import { ProfileManager } from './ProfileManager';
import { LeaderboardManager } from './LeaderboardManager';

export class AuthManager {
  constructor(private socket) {
    this.register();
  }

  register() {
    this.socket.on('getNick', () => {
      this.socket.emit('getNickRes', { nick: this.socket.data.nick });
    });

    this.socket.on('getHash', () => {
      this.socket.emit('getHashRes', {
        hash: Utils.verboseHash(this.socket.data.hash, 4),
      });
    });

    this.socket.on('changeNick', async (data: { nick: string }) => {
      console.log('AAA' + data.nick + 'AAA');
      await SQL.knex
        .update({
          nick: data.nick,
        })
        .table('users')
        .where('dev_id', this.socket.data.devId);

      this.socket.emit('changeNickRes', { nick: data.nick });
    });

    this.socket.on(
      'autoAuth',
      async (data: { devId: string; nick: string }) => {
        this.socket.data.devId = data.devId;
        this.socket.data.nick = data.nick ? data.nick : 'Anonymous';

        const userCheck = await SQL.knex
          .select(['hash'])
          .from('users')
          .where('dev_id', data.devId)
          .limit(1);

        if (userCheck.length <= 0) {
          // register

          const hashCheck = await SQL.knex
            .select(['hash'])
            .from('users')
            .orderBy('hash', 'desc')
            .limit(1);

          let hash = 1;

          if (hashCheck.length <= 0) {
            hash = 1;
          } else {
            hash = hashCheck[0].hash + 1;
          }

          this.socket.data.hash = hash;

          await SQL.knex
            .insert({
              dev_id: this.socket.data.devId,
              xp: 0,
              nick: this.socket.data.nick,
              hash,
            })
            .into('users');
        } else {
          // update

          this.socket.data.hash = userCheck[0].hash;

          await SQL.knex
            .update({
              nick: this.socket.data.nick,
            })
            .table('users')
            .where('dev_id', this.socket.data.devId);
        }

        console.log('Evided');

        this.socket.data.GameManager = new GameManager(this.socket);

        this.socket.data.LevelManager = new LevelManager(this.socket);

        this.socket.data.GlobalQuestManager = new GlobalQuestManager(
          this.socket,
        );

        this.socket.data.ProfileManager = new ProfileManager(this.socket);

        console.log('New LB Manater');
        this.socket.data.LeaderboardManager = new LeaderboardManager(
          this.socket,
        );

        this.socket.emit('autoAuthRes', {
          nick: this.socket.data.nick,
        });
      },
    );
  }
}
