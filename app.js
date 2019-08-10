const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

let pokemons = [
    {name:'Pikachu',type:'Electhic'},
    {name:'Goduk',type:'Water'},
    {name:'Charizard',type:'Fire'}
]


app.get("/pokemons", (req, res) => res.send(pokemons))


app.post("/pokemons", (req, res) => {
    console.log(req.body)
    pokemons.push(req.body)
    res.sendStatus(201)
})


app.listen(port, () => console.log(`Pokemon!! API listening on port ${port}!`))