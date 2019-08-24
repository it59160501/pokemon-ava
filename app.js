const express = require("express")
const pokemonsRouter = require('./pokemons/router') //include เชื่อม app.js กับ pookemon router
const app = express()

app.use(express.json())
app.use(pokemonsRouter) // สั่งให้ app.js รู้จัก pookemon router

app.get("/", (req, res) => res.send({message:'Hello World'}))

module.exports = app