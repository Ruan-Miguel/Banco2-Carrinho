const Sequelize = require('sequelize')

const sequelize = new Sequelize('teste', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}