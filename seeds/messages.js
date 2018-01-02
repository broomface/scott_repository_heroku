
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {
          id:1,
          name:'Criminal',
          message:'What Are You?',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')

        },{
          id:2,
          name:'Batman',
          message:'I\'m Batman',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }
      ]);
    })
  .then(function() {
    return knex.raw(
      "SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages))"
    )
  })
};
