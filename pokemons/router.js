const express = require("express")
const router = express.Router()
const pokemon = require('./pokemon')

function isSufficientParameter(v){
    return v !== null && v !== '' && v !== undefined 
}

router.get("/pokemons", (req, res) => res.send(pokemons))

router.post("/pokemons", (req, res) => {

    if(!isSufficientParameter(req.body.name) || !isSufficientParameter(req.body.type)){
        res.status(400).send({error:'Insufficient parameter: name and type are required parameter'}) //https status 4xx up such as 4xx client error 
        return 
    }
    let success = pokemon.savePokemon(req.body.name,req.body.type)
    if(!success){
        res.status(400).send({error:'Create pokemon is unsuccessfully'}) //https status 4xx up such as 4xx client error 
        return 
    }

    // let pokemon = createPokemon(req.body.name,req.body.type)
    // pokemons.push(pokemon)
    res.sendStatus(201)
})

router.get('/pokemon/:id', (req, res) => {
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: pokemon are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }

    let id = req.params.id-1
    let p = pokemon.getPokemonById(id)
    if(!pokemon.isPokemonExisted(id)){
        res.status(400).send({error:'The pokemon could not be found'}) //https status 4xx up such as 4xx client error 
        return
    }

    res.send(p)
})

router.put('/pokemon/:id', (req, res) => {
    if(!isSufficientParameter(req.body.type2)){
        res.status(400).send({error:'Insufficient parameter: type2 are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }
    
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: id are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }

    let id = req.params.id-1

    if(!pokemon.isPokemonExisted(id)){
        res.status(400).send({error:'Cannot update Pokemon: Pokemon is not found'}) //https status 4xx up such as 4xx client error 
        return
    }
    let p = pokemon.getPokemonById(id)
    p.type2 = req.body.type2
    let success = pokemon.updatePokemon(p)
    if(!success){
        res.status(400).send({error:'Update pokemon is unsuccessfully'}) //https status 4xx up such as 4xx client error 
        return 
    }

    res.sendStatus(200) //update use 200 or **204 ในกรณีที่่ไม่มี respon body เท่านั้น
})

router.delete('/pokemon/:id', (req, res) => {
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: id are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }
    let id = req.params.id-1
    if(!pokemon.isPokemonExisted(id)){
        res.status(400).send({error:'Cannot delete Pokemon: Pokemon is not found'}) //https status 4xx up such as 4xx client error 
        return
    }
    pokemon.deletePokemon(id)
    res.sendStatus(204)
})

module.exports = router // เพื่อให้ข้างนอกรู้จัก