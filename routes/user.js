const express= require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', (req, res) => {
    productController().then(products => {
        res.render('user/products', {products})
    })
})

module.exports = router