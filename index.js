'use strict'
require('dotenv/config')
const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors')

//CONFIGURATION CORS
var corsOptions = {
    origin: 'http://example.comasdfadf',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//SERVICES
const ProductService = require('./src/services/product.service')

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))

// API PRODUCTS
app.get('/api/products', (req, res) => { ProductService.getAll(req, res) })
app.get('/api/products/:id', (req, res) => { ProductService.findById(req, res) })
app.post('/api/products', (req, res) => { ProductService.create(req, res) })
app.put('/api/products/:id', (req, res) => { ProductService.update(req, res) })
app.delete('/api/products/:id', (req, res) => { ProductService.delete(req, res) })

//CONNECTION TO DATABASE
mongoose.connect(
    'mongodb://localhost:27017',
    {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'root',
        pass: 'example',
        dbName: 'shop'
    },
    err => {
        if (err) return console.log(`Error al conectar a la base de datos ${err}`)
        console.log('Conexión a la base de datos establecida')
        app.listen(port, () => {console.log(`API REST running in http://localhost:${port}`)})
    }
)

