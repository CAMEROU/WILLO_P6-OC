require('dotenv').config()
// importation du package d'express
const express = require("express")
const app = express()
//importation du package de cors
const cors = require("cors")

//Middlewares
app.use(cors())
app.use(express.json())

// exportation de app et express
module.exports = {app, express }