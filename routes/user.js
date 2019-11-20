const express= require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/products', (req, res) => {
    productController().then(products => {
        res.render('user/products', {products})
    })
})

router.get('/addProduct/:id', (req, res) => {
    const { id } = req.params

    console.log(id)
    res.redirect('/user/products')
})

module.exports = router