const mongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID

class Pokemon{
    constructor(name,type){
        this.id=null
        this.name=name
        this.type=type
        this.type2=null
    }
}

let pokemons = []
mockPokemon()

function mockPokemon(){
    pokemons.push(createPokemon('Pikachu','Electhic'))
    pokemons.push(createPokemon('Goduk','Water'))
}

function createId(num){
    return num + 1
}

function savePokemon(name,type){
    let p = createPokemon(name,type)
    // pokemons.push(p)

    const DB_URL = "mongodb+srv://it59160501:it59160501@pokemon-cluster-mi0oq.gcp.mongodb.net/admin?retryWrites=true&w=majority"
    const DB_NAME = 'example'
    var collection,database 
    mongoClient.connect(DB_URL, { useNewUrlParser : true, useUnifiedTopology : true}, (error,client) => {
        if(error){
            return false
        }

        database = client.db(DB_NAME)
        collection = database.collection('pokemons')
        collection.insert(p, (err,result)=>{
            if(err){
                return false
            }
            return true
        })
    })
}

function createPokemon(name,type){
    let pokemon = new Pokemon(name,type)
    pokemon.id = createId(pokemons.length)
    return pokemon
}

function isPokemonExisted(id){
    return pokemons[id] !== undefined && pokemons[id] !== null
}

function getPokemonById(id){
    return pokemons[id]
}

function updatePokemon(pokemon){
    pokemons[pokemon.id] = pokemon
    return true
}

function deletePokemon(id){
    delete pokemons[id]
}

module.exports.isPokemonExisted = isPokemonExisted

module.exports.createPokemon = createPokemon

module.exports.savePokemon = savePokemon

module.exports.getPokemonById = getPokemonById

module.exports.updatePokemon = updatePokemon

module.exports.deletePokemon = deletePokemon