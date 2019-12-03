const Product = require('../models/Product')

/*Product.create({
    name: 'Daniel sem nada',
    price: 1000000
})*/

let list = async () => {
    let result
    await Product.findAll().then(products => {
        result = products
    })
    return result
}

module.exports = list