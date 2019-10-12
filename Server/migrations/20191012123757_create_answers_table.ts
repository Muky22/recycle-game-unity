import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('answers', table => {
    table.increments();

    table
      .integer('u_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

    table.string('item', 128).notNullable();
    table.string('answer', 128).notNullable();
    table.string('correct_answer', 128).notNullable();
    table.boolean('correct').notNullable();

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.dropTable('answers');
}
