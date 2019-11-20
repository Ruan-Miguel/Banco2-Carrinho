const Product = require('../models/Product')

/*Product.create({
    name: 'Daniel',
    price: 400
})*/

let list = async () => {
    let result
    await Product.findAll().then(products => {
        result = products
    })
    return result
}

module.exports = list