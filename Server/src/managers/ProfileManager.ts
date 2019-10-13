import { SQL } from '../classes/SQL';

export class ProfileManager {
  constructor(private socket) {
    this.register();
  }

  register() {
    this.socket.on('getProfile', async () => {
      const uidQuery = SQL.knex
        .select(['id'])
        .from('users')
        .where('dev_id', this.socket.data.devId);

      const data = await SQL.knex
        .select(['answer', SQL.knex.raw('COUNT(id) AS total')])
        .from('answers')
        .where('correct', 1)
        .groupBy('answer')
        .where('u_id', uidQuery);

      const dataObj: any = {};

      let max = -1;
      let maxKey = 'Not Yet';

      data.forEach(d => {
        dataObj[d.answer] = d.total;

        if (max === -1 || max < d.total) {
          max = d.total;
          maxKey = d.answer;
        }
      });

      const maxKeyVerbose = maxKey.charAt(0).toUpperCase() + maxKey.slice(1);

      this.socket.emit('getProfileRes', {
        level: this.socket.data.LevelManager.getLevel(),
        quests: 0,
        glass: dataObj.glass ? dataObj.glass : 0,
        plastic: dataObj.plastic ? dataObj.plastic : 0,
        ewaste: dataObj.ewaste ? dataObj.ewaste : 0,
        paper: dataObj.paper ? dataObj.paper : 0,
        mixed: dataObj.mixed ? dataObj.mixed : 0,
        metal: dataObj.metal ? dataObj.metal : 0,
        master: maxKeyVerbose + ' Master',
      });
    });
  }
}
