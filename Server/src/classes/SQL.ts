import * as knexConfig from '../../knexfile.js';
import * as Knex from 'knex';

export class SQL {
  public static knex: Knex;
  public static i: SQL;

  static getInstance(): SQL {
    if (!SQL.i) {
      SQL.i = new SQL();
    }

    return SQL.i;
  }

  constructor() {
    SQL.knex = Knex(knexConfig.development);

    this.setup();
  }

  async setup() {
    await SQL.knex.raw('SET NAMES utf8');
  }
}
