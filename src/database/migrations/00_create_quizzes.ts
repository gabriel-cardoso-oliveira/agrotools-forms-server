import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('quizzes', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('user').nullable()
    table.date('date').nullable()
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('quizzes');
}
