const express= require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const atualizarCarrinho = require('../models/redis')

router.get('/products', (req, res) => {
    productController().then(products => {
        res.render('user/products', {products})
    })
})

router.get('/addProduct/:id', (req, res) => {
    const { id } = req.params
    
    atualizarCarrinho('1234', id)

    res.redirect('/user/products')
})

module.exports = router