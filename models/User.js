const { Sequelize, sequelize } = require('./postgre')

const User = sequelize.define('usuario', {
    name: {
        type: Sequelize.STRING
    },
    carrinho: {
        type: Sequelize.STRING
    }
})

//Recriar tabela
//User.sync({ force: true })

module.exports = User