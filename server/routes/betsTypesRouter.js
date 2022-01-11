const Router = require('express')
const router = new Router()
const {betsTypesController} = require('../controllers')

router.post('/', betsTypesController.create)
router.put('/:id', betsTypesController.update)
router.get('/', betsTypesController.getAll)
// router.get('/:id', betsTypesController.getOne)
router.delete('/:id', betsTypesController.delete)

module.exports = router