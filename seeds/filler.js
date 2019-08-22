
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('items').insert([
    {name: 'pulp Fiction', rating: 12 },
    {name: 'MIB', rating: 16 },
    

  ])
};
