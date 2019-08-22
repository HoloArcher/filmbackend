

exports.up = async function(knex) {
  await knex.schema.createTable('items', table => {
      table.increments('id')
      table.text('name'),
      table.int('rating')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('items')
};
