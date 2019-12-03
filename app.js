//Modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const user = require('./routes/user')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')

//Settings
    //Session
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))

    //Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Mongoose
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/Carrinho', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('mongo rodando a mil')
    }).catch( err => {
        console.log(`Erro ao se conectar: ${err}`)
    })

    //Public
    app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/user', user)

//Others
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor so o ouro rodando em http://localhost:${PORT}`)
})