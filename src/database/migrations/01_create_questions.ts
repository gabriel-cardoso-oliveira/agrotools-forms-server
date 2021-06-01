import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('questions', table => {
    table.increments('id').primary()
    table.string('description').notNullable()
    table.integer('quiz_id').notNullable()
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('questions');
}
