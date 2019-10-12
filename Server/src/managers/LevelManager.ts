import { SQL } from '../classes/SQL';

export class LevelManager {
  lastSaved = 0;

  constructor(private socket) {
    this.register();

    setInterval(async () => {
      if (this.lastSaved !== this.socket.data.xp) {
        this.lastSaved = this.socket.data.xp;

        await SQL.knex
          .update({
            xp: this.socket.data.xp,
          })
          .table('users')
          .where('dev_id', this.socket.data.devid);
      }
    }, 10000);
  }

  async register() {
    this.socket.data.xp = 0;

    const levelData = await SQL.knex
      .select(['xp'])
      .from('users')
      .where('dev_id', this.socket.data.devId)
      .limit(1);

    if (levelData.length > 0) {
      this.socket.data.xp = levelData[0].xp;
    }

    const data = this.getLevelData();
    this.socket.emit('initXpChange', { perc: this.getPercentageProgress() });
    this.socket.emit('initLevelChange', data.level);
  }

  getLevelData() {
    let totalXp = this.socket.data.xp;
    let level = 1;

    while (totalXp >= level) {
      totalXp -= level;
      level++;
    }

    return { level, xp: totalXp };
  }

  getPercentageProgress() {
    const { xp, level } = this.getLevelData();

    return Math.round((xp / level) * 100);
  }

  getLevel() {
    return this.getLevelData().level;
  }

  getXp() {
    return this.getLevelData().xp;
  }

  onCorrectAnswer() {
    const levelBefore = this.getLevel();
    this.socket.data.xp += 1;

    this.onXpChange(levelBefore);
  }

  onWrongAnswer() {
    const levelBefore = this.getLevel();

    this.socket.data.xp -= this.getXp() + 1;
    this.socket.data.xp -= this.getXp();

    this.onXpChange(levelBefore);
  }

  onXpChange(levelBefore: number) {
    this.socket.emit('xpChange', { perc: this.getPercentageProgress() });

    const levelAfter = this.getLevel();

    if (levelBefore !== levelAfter) {
      this.socket.emit('levelChange', { level: levelAfter });
    }
  }
}
