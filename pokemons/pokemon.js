const mongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID

const DB_URL = "mongodb+srv://it59160501:it59160501@pokemon-cluster-mi0oq.gcp.mongodb.net/admin?retryWrites=true&w=majority"
const DB_NAME = 'example'
const options = { useNewUrlParser : true, useUnifiedTopology : true}
var client
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

async function connectDatabase(){
    if(client !== null && client !== undefined && client.isConnected){
        return client
    }

    client = await mongoClient.connect(DB_URL,options)
    .catch(err => console.log(err))

    return client
}

async function getColletion(name){
    client = await connectDatabase().catch(err => console.log(err))
    database = client.db(DB_NAME)
    collection = database.collection(name)
    return collection
}

async function getPokemon(){

    var collection = await getColletion('pokemons')

    try{
        var result = await collection.find( {} ).toArray()
        return result
    }
    catch(err){
        console.error(err)
        return false
    }finally{
        client.close()
    }

}

function mockPokemon(){
    pokemons.push(createPokemon('Pikachu','Electhic'))
    pokemons.push(createPokemon('Goduk','Water'))
}

function createId(num){
    return num + 1
}

async function savePokemon(name,type){
    let p = createPokemon(name,type)
    var collection = await getColletion('pokemons')
    try{
        var result = await collection.insert(p)
        return true
    }
    catch(err){
        console.error(err)
        return false
    }finally{
        client.close()
    }

    // mongoClient.connect(DB_URL, { useNewUrlParser : true, useUnifiedTopology : true}, (error,client) => {
    //     if(error){
    //         return false
    //     }

    //     database = client.db(DB_NAME)
    //     collection = database.collection('pokemons')
    //     collection.insert(p, (err,result)=>{
    //         if(err){
    //             return false
    //         }
    //         return true
    //     })
    // })
}

function createPokemon(name,type){
    let pokemon = new Pokemon(name,type)
    pokemon.id = createId(pokemons.length)
    return pokemon
}

function isPokemonExisted(id){
    return pokemons[id] !== undefined && pokemons[id] !== null
}

async function getPokemonById(id){
    // return pokemons[id]
    var collection = await getColletion('pokemons')
    try{
        var result = await collection.findOne({"_id" : objectID(id)})
        return result
    }
    catch(err){
        console.error(err)
        return false
    }finally{
        client.close()
    }
}

async function updatePokemon(id,newType){
    var collection = await getColletion('pokemons')
    try{
        var result = await collection.updateOne(
           { "_id" : objectID(id)},
           {$set: { "type2" : newType}} 
        )
        return result
    }
    catch(err){
        console.error(err)
        return false
    }finally{
        client.close()
    }
}

function deletePokemon(id){
    delete pokemons[id]
}

module.exports.getPokemon = getPokemon

module.exports.isPokemonExisted = isPokemonExisted

module.exports.createPokemon = createPokemon

module.exports.savePokemon = savePokemon

module.exports.getPokemonById = getPokemonById

module.exports.updatePokemon = updatePokemon

module.exports.deletePokemon = deletePokemon