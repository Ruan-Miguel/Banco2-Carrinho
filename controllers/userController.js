const User = require('../models/User')

let add = async (name, list) => {
    await User.create({
        name: name,
        carrinho: list
    })
}

let search = async (name) => {
    let result
    await User.findOne({where: {name: name}}).then(user => {
        if (!user) {
            result = null
        } else {
            result = user
        }
    })
    return result
}

module.exports = {
    add: add,
    search: search
}