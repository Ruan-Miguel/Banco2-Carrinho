var redis = require("redis")
client = redis.createClient()

const atualizarCarrinho = (user, id) => {
    client.get(user, (err, carrinho) => {
        if (!carrinho) {
            carrinho = ''
        }

        carrinho += id + ','
        client.set(user, carrinho)
    })
}

module.exports = atualizarCarrinho