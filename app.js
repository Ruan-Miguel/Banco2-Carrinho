//Modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const user = require('./routes/user')
const path = require('path')

//Settings
    //Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Public
    app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/user', user)

//Others
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor so o ouro rodando em http://localhost:${PORT}`)
})