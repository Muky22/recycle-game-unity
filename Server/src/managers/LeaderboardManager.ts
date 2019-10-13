import { SQL } from '../classes/SQL';
import { LevelManager } from './LevelManager';
import { Utils } from '../Utils';

export class LeaderboardManager {
  constructor(private socket) {
    console.log('REGISTER LB MANAGER');
    this.register();
  }

  register() {
    console.log('VSETKO OOOOOOK');
    this.socket.on('getLeaderboard', async () => {
      console.log('req');
      const promises = [this.getLevelRecycled(), this.getTotalLeaderboard()];
      const boards = await Promise.all(promises);
      console.log('After');
      /*
      level
      total

              {
          title: 'Today Recycled',
          players: [],
        },
        {
          title: 'Recycle Ratio',
          players: [],
        },
        {
          title: 'Glass Recycled',
          players: [],
        },
        {
          title: 'Plastic Recycled',
          players: [],
        },
        {
          title: 'E-Waste Recycled',
          players: [],
        },
        {
          title: 'Paper Recycled',
          players: [],
        },
        {
          title: 'Mixed Trash Recycled',
          players: [],
        },
        {
          title: 'Metal Recycled',
          players: [],
        },
        */

      console.log('Sending ', boards);
      this.socket.emit('getLeaderboardRes', {
        boards,
      });
    });
  }

  async getLevelRecycled() {
    const totalData = await SQL.knex
      .select(['nick', 'hash', 'xp'])
      .from('users')
      .orderBy('xp', 'desc')
      .limit(10);

    const playersArr = [];

    totalData.forEach(u => {
      playersArr.push({
        nick: `${u.nick} #${Utils.verboseHash(u.hash, 4)}`,
        value: LevelManager.getLevelData(u.xp).level,
      });
    });

    while (playersArr.length < 10) {
      playersArr.push({
        nick: 'Noone Yet',
        value: 0,
      });
    }

    return {
      title: 'Highest Level',
      players: playersArr,
    };
  }

  async getTotalLeaderboard() {
    const uId = SQL.knex.raw('??', 'answers.u_id');
    const uidQuery = SQL.knex
      .select([SQL.knex.raw("CONCAT(nick, '{{mel11&&&&}}', hash) AS nick")])
      .from('users')
      .where('id', uId)
      .as('nick');

    const dataQuery = await SQL.knex
      .select([SQL.knex.raw('COUNT(id) AS total'), uidQuery])
      .from('answers')
      .groupBy('u_id')
      .orderBy('total', 'desc')
      .limit(10);

    const playersArr = [];

    dataQuery.forEach(u => {
      const nickArr = u.nick.split('{{mel11&&&&}}');
      playersArr.push({
        nick: `${nickArr[0]} #${Utils.verboseHash(nickArr[1], 4)}`,
        value: u.total,
      });
    });

    while (playersArr.length < 10) {
      playersArr.push({
        nick: 'Noone Yet',
        value: 0,
      });
    }

    return {
      title: 'Total Recycled',
      players: playersArr,
    };
  }
}
