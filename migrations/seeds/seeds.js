exports.seed = async function (knex) {
    await knex('items').del()
    await knex('items').insert([
        { internal_name: 'ore_stone', 'name': 'Stone Ore', category: 'mining', icon: '/icons/stone.png', metadata: { total_health: 10 } }
    ])
}
