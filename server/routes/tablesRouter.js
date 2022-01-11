const Router = require('express')
const router = new Router()
const {tableController} = require('../controllers')

router.post('/', tableController.create)
router.put('/:id', tableController.update)
router.get('/', tableController.getAll)
router.get('/:id', tableController.getOne)
router.get('/stats/:id', tableController.getStats)
router.delete('/:id', tableController.delete)

module.exports = router