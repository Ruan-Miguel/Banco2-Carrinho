const Product = require('../models/Product')

/*Product.create({
    name: 'moto',
    price: 16000
})*/

let list = async () => {
    let result
    await Product.findAll().then(products => {
        result = products
    })
    return result
}

module.exports = list