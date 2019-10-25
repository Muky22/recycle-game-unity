import { SQL } from '../classes/SQL';
import { LevelManager } from './LevelManager';
import { Utils } from '../Utils';

export class LeaderboardManager {
  constructor(private socket) {
    this.register();
  }

  async register() {
    this.socket.on('getLeaderboard', async () => {
      const promises: any[] = [
        this.getTypeRecycled('glass', 'Glass Recycled'),
        this.getTypeRecycled('metal', 'Metal Trash Recycled'),
        this.getTypeRecycled('mixed', 'Mixed Trash Recycled'),
        this.getTypeRecycled('paper', 'Paper Trash Recycled'),
        this.getTypeRecycled('plastic', 'Plastic Trash Recycled'),
        this.getTypeRecycled('organic', 'Organic Trash Recycled'),
        this.getRecycleRatio(),
        this.getTodayTotalRecycled(),
        this.getLevelRecycled(),
        this.getTotalLeaderboard(),
      ];
      const boards = await Promise.all(promises);

      this.socket.emit('getLeaderboardRes', {
        boards,
      });
    });
  }

  async getTypeRecycled(type: string, title: string) {
    const totalData = await SQL.knex
      .select([
        SQL.knex.raw('COUNT(answers.id) AS total'),
        'users.nick',
        'users.hash',
      ])
      .from('answers')
      .leftJoin('users', function() {
        this.on('answers.u_id', '=', 'users.id');
      })
      .groupBy('answers.u_id')
      .orderBy('total', 'desc')
      .where('correct', 1)
      .where('correct_answer', type)
      .limit(10);

    const arr = totalData.map(u => {
      return {
        nick: `${u.nick} #${Utils.verboseHash(u.hash, 4)}`,
        value: u.total,
      };
    });

    while (arr.length < 10) {
      arr.push({
        nick: 'Noone Yet',
        value: 0,
      });
    }

    return {
      title,
      players: arr,
    };
  }

  async getRecycleRatio() {
    const uId = SQL.knex.raw('??', 'a.u_id');

    const correctQuery = SQL.knex
      .select([SQL.knex.raw('COUNT(id) AS correct_amount')])
      .from('answers')
      .where('u_id', uId)
      .groupBy('correct')
      .having('correct', '=', 1);

    const wrongQuery = SQL.knex
      .select([SQL.knex.raw('COUNT(id) AS correct_amount')])
      .from('answers')
      .where('u_id', uId)
      .groupBy('correct')
      .having('correct', '=', 0);

    const table = SQL.knex
      .select([
        'u_id',
        SQL.knex.raw(`(${correctQuery.toQuery()}) AS correct`),
        SQL.knex.raw(`(${wrongQuery.toQuery()}) AS wrong`),
      ])
      .from(SQL.knex.raw('answers AS a'))
      .groupBy('u_id')
      .orderBy('u_id', 'desc')
      .limit(10);

    const totalData = await SQL.knex
      .select([
        SQL.knex.raw('t.u_id'),
        SQL.knex.raw('t.correct / (t.wrong + t.correct) AS ratio'),
        SQL.knex.raw('t.correct + t.wrong AS total'),
        'users.nick',
        'users.hash',
      ])
      .from(SQL.knex.raw(`(${table.toQuery()}) AS t`))
      .leftJoin('users', function() {
        this.on('t.u_id', 'users.id');
      });

    const arr = totalData.map(u => {
      return {
        nick: `${u.nick} #${Utils.verboseHash(u.hash, 4)}`,
        value: u.ratio,
      };
    });

    while (arr.length < 10) {
      arr.push({
        nick: 'Noone Yet',
        value: 0,
      });
    }

    return {
      title: 'Recycle Ratio',
      players: arr,
    };
  }

  async getTodayTotalRecycled() {
    const totalData = await SQL.knex
      .select([
        SQL.knex.raw('COUNT(answers.id) AS total'),
        'users.nick',
        'users.hash',
      ])
      .from('answers')
      .leftJoin('users', function() {
        this.on('answers.u_id', '=', 'users.id');
      })
      .groupBy('answers.u_id')
      .orderBy('total', 'desc')
      .where('correct', 1)
      .limit(10);

    // TODO: Add today

    const arr = totalData.map(u => {
      return {
        nick: `${u.nick} #${Utils.verboseHash(u.hash, 4)}`,
        value: u.total,
      };
    });

    while (arr.length < 10) {
      arr.push({
        nick: 'Noone Yet',
        value: 0,
      });
    }

    return {
      title: 'Today Recycled',
      players: arr,
    };
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
    const dataQuery = await SQL.knex
      .select([
        SQL.knex.raw('COUNT(answers.id) AS total'),
        'users.nick',
        'users.hash',
      ])
      .from('answers')
      .leftJoin('users', function() {
        this.on('answers.u_id', 'users.id');
      })
      .groupBy('u_id')
      .orderBy('total', 'desc')
      .where('correct', 1)
      .limit(10);

    const playersArr = [];

    dataQuery.forEach(u => {
      playersArr.push({
        nick: `${u.nick} #${Utils.verboseHash(u.hash, 4)}`,
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
