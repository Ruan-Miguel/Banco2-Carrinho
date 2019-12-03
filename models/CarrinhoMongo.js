const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Carrinho = new Schema({
    userName: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    }
})

mongoose.model('carrinhos', Carrinho)