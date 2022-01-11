const Router = require('express')
const router = new Router()
const {gameController} = require('../controllers')

router.post('/', gameController.create)
router.put('/:id', gameController.update)
router.get('/', gameController.getAll)
router.get('/:id', gameController.getOne)
router.get('/:id/betsTypes', gameController.getBetsTypes)
router.delete('/:id', gameController.delete)

module.exports = router