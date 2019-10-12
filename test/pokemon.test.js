import test from 'ava'
const MongoDBServer = require('mongomem').MongoDBServer
require('chai').should()

const pokemon = require('../pokemons/pokemon')

test.before("Start MongoDBserver", async t => {
    await MongoDBServer.start()
    const dburi = await MongoDBServer.getConnectionString()
    pokemon.dburi(dburi)
    pokemon.savePokemon('Pikachu','electric')
})

test('getPokemon()', async t => {
    let result = await pokemon.getPokemon()
    t.true(Array.isArray(result))
    let p = result[0]
    p.should.have.property('_id')
    p.should.have.property('name')
    p.should.have.property('type')
    p.should.have.property('type2')

})

test('getPokemonById(id)', async t => {
    let result = await pokemon.getPokemonById('5da1851284fc482368ce7cc4')
    console.log(result)
    result.should.have.property('_id')
    result.should.have.property('name')
    result.should.have.property('type')
    result.should.have.property('type2')
})

// test('savePokemon(name,type)', async t => {
//     let result = await pokemon.savePokemon('Risadon','Fire')
//     t.true(result)
// })



// test('updatePokemon()', async t => {
//     let p = await pokemon.getPokemonById('5da1851284fc482368ce7cc4')
//     p.type2 = 'test'
//     let result = await pokemon.updatePokemon('5da1851284fc482368ce7cc4',p)
//     t.true(result)
// })