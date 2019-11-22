const express= require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { atualizarCarrinho, retornaCarrinho, salvaUsuario } = require('../models/redis')

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.post('/auth', (req, res) => {
    let temp = req.body.userName
    console.log(temp)
    temp = temp.trim()

    if (temp == '') {
        res.redirect('login')
    } else {
        req.session.userName = temp
        res.redirect('/user/products')
    }
})

router.get('/products', (req, res) => {
    if (!req.session.userName) {
        res.redirect('login')
    } else {
        retornaCarrinho(req.session.userName).then(list => {
            productController().then(products => {
                res.render('user/products', {products: products, list:list})
            })
        })
    }
})

router.get('/addProduct/:id', (req, res) => {
    const { id } = req.params
    atualizarCarrinho(req.session.userName, id)

    res.redirect('/user/products')
})

router.get('/save', (req, res) => {
    salvaUsuario(req.session.userName)

    res.redirect('/user/login')
})

module.exports = router