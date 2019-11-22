const redis = require("redis")
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const userController = require('../controllers/userController')
const client = redis.createClient()

const atualizarCarrinho = (user, id) => {
    client.get(user, (err, carrinho) => {
        if (!carrinho) {
            carrinho = '' + id
        } else {
            carrinho += ',' + id
        }
        client.set(user, carrinho, 'EX', 7200)
    })
}

const retornaCarrinho = async (user) => {
    let result
    await client.getAsync(user).then(res => {
        result = res
    })
    return result
}

const salvaUsuario = (user) => {
    client.get(user, (err, carrinho) => {
        userController.add(user, carrinho)
    })
}

module.exports = {
    atualizarCarrinho: atualizarCarrinho,
    salvaUsuario: salvaUsuario,
    retornaCarrinho: retornaCarrinho
}