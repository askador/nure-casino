const Router = require('express')
const router = new Router()

module.exports = (req, res) => {
    return res.json({message: "pong"})
}