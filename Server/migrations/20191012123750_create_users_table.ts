import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table.increments();

    table.string('dev_id', 128).notNullable();
    table
      .integer('xp')
      .notNullable()
      .defaultTo(0);
    table.string('nick', 128).notNullable();

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('users');
}
