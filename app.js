const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

// {name:'Pikachu',type:'Electhic'},
// {name:'Goduk',type:'Water'},
// {name:'Charizard',type:'Fire'}

class Pokemon{
    constructor(name,type){
        this.id=null
        this.name=name
        this.type=type
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

app.get("/pokemons", (req, res) => res.send(pokemons))


app.post("/pokemons", (req, res) => {

    if(req.body.name === null 
        || req.body.name === '' 
        || req.body.name === undefined 
        || req.body.type === null 
        || req.body.type === '' 
        || req.body.type === undefined ){
        res.status(400).send({error:'Insufficient parameter:  name and type are required parameter'}) //https status 4xx up such as 4xx client error 
        return 
    }
    let pokemon = createPokemon(req.body.name,req.body.type)
    pokemons.push(pokemon)
    res.sendStatus(201)
})


app.listen(port, () => console.log(`Pokemon!! API listening on port ${port}!`))