const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())
// https://bit.ly/2KQb0gR
// {name:'Pikachu',type:'Electhic'},
// {name:'Goduk',type:'Water'},
// {name:'Charizard',type:'Fire'}

class Pokemon{
    constructor(name,type1){
        this.id=null
        this.name=name
        this.type1=type1
        this.type2=null
    }

}

let pokemons = []
pokemons.push(createPokemon('Pikachu','Electhic'))
pokemons.push(createPokemon('Goduk','Water'))

function createId(num){
    return num + 1
}

function createPokemon(name,type){
    let pokemon = new Pokemon(name,type)
    pokemon.id = createId(pokemons.length)
    return pokemon
}

function isSufficientParameter(v){
    return v !== null || v !== '' || v !== undefined 
}

// function isPokemonExisted(id){
//     return pokemons[id]
//     let pokemon = pokemons[id]
//     if(pokemon === undefined){
//         res.status(400).send({error:'Cannot delete Pokemon: Pokemon is not found'}) //https status 4xx up such as 4xx client error 
//         return
//     }
// }

app.get("/pokemons", (req, res) => res.send(pokemons))

app.get('/pokemons/:id', (req, res) => {
    let id = req.params.id-1
    res.send(pokemons[id])
})

app.post("/pokemons", (req, res) => {

    if(isSufficientParameter(req.body.name)
        || isSufficientParameter(req.body.type)){
        res.status(400).send({error:'Insufficient parameter: name and type are required parameter'}) //https status 4xx up such as 4xx client error 
        return 
    }
    let pokemon = createPokemon(req.body.name,req.body.type)
    pokemons.push(pokemon)
    res.sendStatus(201)
})

app.put('/pokemons/:id', (req, res) => {
    if(!isSufficientParameter(req.body.type2)){
        res.status(400).send({error:'Insufficient parameter: type2 are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }
    
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: id are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }
    let id = req.params.id-1
    let pokemon = pokemons[id]
    if(pokemon === undefined){
        res.status(400).send({error:'Cannot update Pokemon: Pokemon is not found'}) //https status 4xx up such as 4xx client error 
        return
    }
    pokemon.type2 = req.body.type2
    pokemons[id] = pokemon
    res.sendStatus(200) //update use 200 or **204 ในกรณีที่่ไม่มี respon body เท่านั้น
})

app.delete('/pokemons/:id', (req, res) => {
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: id are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }
    let id = req.params.id-1
    let pokemon = pokemons[id]
    if(pokemon === undefined){
        res.status(400).send({error:'Cannot delete Pokemon: Pokemon is not found'}) //https status 4xx up such as 4xx client error 
        return
    }
    delete pokemons[id]
    res.sendStatus(204)
 })

app.listen(port, () => console.log(`Pokemon!! API listening on port ${port}!`))