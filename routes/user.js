const express= require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const { atualizarCarrinho, retornaCarrinho } = require('../models/redis')
const mongoose = require('mongoose')
require('../models/CarrinhoMongo')
const CarrinhoMongo = mongoose.model('carrinhos')

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.post('/auth', (req, res) => {
    let temp = req.body.userName
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
    retornaCarrinho(req.session.userName).then(list => {
        /*userController.add(req.session.userName, list).then(() => {
            res.redirect('/user/success')
        })
        */
        const novoCarrinho = {
            userName: req.session.userName,
            products: list
        }
    
        new CarrinhoMongo(novoCarrinho).save().then(() => {
            res.redirect('/user/success')
        }).catch( err => {
            res.send(`vish: ${err}`)
        })
    })
    .catch(err => {
        console.log(`erro no redis: ${err}`)
    })
})

router.get('/success', (req, res) => {
    CarrinhoMongo.findOne({userName: req.session.userName}).then(user => {
        productController().then(products => {
            console.log(user)
            let productsId = user.products.split(',')
            let productsName = []
            productsId.forEach(id => {
                product = products.find( product => {
                    return product.id == id
                })
                productsName.push(product.name)
            })
            console.log(productsName)
            res.render('user/success', {productsName})
        }).catch(err => console.log('ta aqui>>>>>>>>>>>>>>>>>>>>>>>>>...' + err))
    })
})

module.exports = router