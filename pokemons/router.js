const express = require("express")
const router = express.Router()
const pokemon = require('./pokemon')

function isSufficientParameter(v){
    return v !== null && v !== '' && v !== undefined 
}

router.get("/pokemons", (req, res) => {

    pokemon.getPokemon().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.error(err)
        res.status(400).send({error:'The pokemon could not be found'})
    })
})

router.post("/pokemons", (req, res) => {

    if(!isSufficientParameter(req.body.name) || !isSufficientParameter(req.body.type)){
        res.status(400).send({error:'Insufficient parameter: name and type are required parameter'}) //https status 4xx up such as 4xx client error 
        return 
    }

    pokemon.savePokemon(req.body.name,req.body.type).then((result)=>{
        res.sendStatus(201)
    }).catch((err)=>{
        console.error(err)
        res.status(400).send({error:'Create pokemon is unsuccessfully'})
    })

})

router.get('/pokemon/:id', (req, res) => {
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: pokemon are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }

    let id = req.params.id
    pokemon.getPokemonById(id).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.error(err)
        res.status(400).send({error:'The pokemon could not be found'})
    })
})

router.put('/pokemon/:id', async (req, res) => {
    if(!isSufficientParameter(req.body.type2)){
        res.status(400).send({error:'Insufficient parameter: type2 are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }
    
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: id are required parameter'}) //https status 4xx up such as 4xx client error 
        return
    }

    let id = req.params.id
    
    let p = await pokemon.getPokemonById(id)
    p.type2 = req.body.type2

    try{
        var result = await pokemon.updatePokemon(req.body.type2,p)
        res.sendStatus(200)
    }catch(err){
        console.error(err)
    }

    // if(!p){
    //     res.status(400).send({error:'Cannot update Pokemon: Pokemon is not found'}) //https status 4xx up such as 4xx client error 
    //     return
    // }

    // pokemon.updatePokemon(id,req.body.type2).then((result)=>{
    //     res.sendStatus(200)
    // }).catch((err)=>{
    //     console.error(err)
    //     res.status(400).send({error:'Update pokemon is unsuccessfully'})
    // })
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