import { SQL } from '../classes/SQL';

export class LevelManager {
  lastSaved = 0;
  interval = null;

  constructor(private socket) {
    this.register();

    this.interval = setInterval(async () => {
      await this.saveLevel();
    }, 60000);
  }

  async saveLevel() {
    if (this.socket.data && this.lastSaved !== this.socket.data.xp) {
      this.lastSaved = this.socket.data.xp;

      await SQL.knex
        .update({
          xp: this.socket.data.xp,
        })
        .table('users')
        .where('dev_id', this.socket.data.devId);
    }
  }

  async destroy() {
    await this.saveLevel();
    clearInterval(this.interval);
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
    this.socket.emit('initLevelChange', { level: data.level });
  }

  static getLevelData(totalXp) {
    let level = 1;

    while (totalXp >= level) {
      totalXp -= level;
      level++;
    }

    return { level, xp: totalXp };
  }

  getLevelData(totalXp = this.socket.data.xp) {
    return LevelManager.getLevelData(totalXp);
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

    if (levelBefore === 1) {
      return;
    }

    if (this.getXp() > 0) {
      this.socket.data.xp -= this.getXp();
    } else {
      this.socket.data.xp -= 1;
    }

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
