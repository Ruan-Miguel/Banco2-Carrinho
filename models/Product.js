const { Sequelize, sequelize } = require('./postgre')

const Product = sequelize.define('product', {
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    }
})

//Recriar tabela
//Product.sync({ force: true })

module.exports = Product