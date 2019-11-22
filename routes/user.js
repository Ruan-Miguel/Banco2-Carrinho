const express= require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { atualizarCarrinho, retornaCarrinho } = require('../models/redis')

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.post('/auth', (req, res) => {
    let temp = req.body.userName
    temp = temp.trim()
    console.log(temp)

    if (!temp || temp == '') {
        res.redirect('login')
    }
    
    req.session.userName = temp
    res.redirect('/user/products')
})

router.get('/products', (req, res) => {
    retornaCarrinho(req.session.userName).then(list => {
        productController().then(products => {
            res.render('user/products', {products: products, list:list})
        })
    })
})

router.get('/addProduct/:id', (req, res) => {
    const { id } = req.params
    console.log(req.session.userName)
    
    atualizarCarrinho(req.session.userName, id)

    res.redirect('/user/products')
})

module.exports = router