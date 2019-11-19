const Product = require('../models/Product')

/*Product.create({
    name: 'Daniel',
    price: 400
})*/

Product.findAll().then(products => {
    console.log("All users:", JSON.stringify(products, null, 4));
})