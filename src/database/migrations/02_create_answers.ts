import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('answers', table => {
    table.increments('id').primary()
    table.string('answer').notNullable()
    table.string('user').notNullable()
    table.date('date').nullable()
    table.integer('question_id').notNullable()
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('answers');
}
