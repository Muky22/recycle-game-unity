import { SQL } from '../classes/SQL';

export class AuthManager {
  constructor(private socket) {
    this.register();
  }

  register() {
    this.socket.on('getNick', () => {
      this.socket.emit('getNickRes', { nick: this.socket.data.nick });
    });

    this.socket.on('changeNick', async (data: { nick: string }) => {
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
          .select([SQL.knex.raw('1')])
          .from('users')
          .where('dev_id', data.devId)
          .limit(1);

        if (userCheck.length <= 0) {
          // register
          await SQL.knex
            .insert({
              dev_id: this.socket.data.devId,
              xp: 0,
              nick: this.socket.data.nick,
            })
            .into('users');
        } else {
          // update

          await SQL.knex
            .update({
              nick: this.socket.data.nick,
            })
            .table('users')
            .where('dev_id', this.socket.data.devId);
        }

        this.socket.emit('autoAuthRes', {
          nick: this.socket.data.nick,
        });
      },
    );
  }
}
