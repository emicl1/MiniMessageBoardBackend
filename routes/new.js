
const express = require('express')
const newController = require('../controllers/newController')

const routes = express.Router()

routes.get('/', newController.newPage)

routes.post("/", newController.newMesage)

module.exports = routes;




















