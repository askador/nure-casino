const Router = require('express')
const router = new Router()
const {locationController} = require('../controllers')

router.post('/', locationController.create)
router.get('/', locationController.getAll)
router.delete('/:id', locationController.delete)

module.exports = router