const Router = require('express')
const router = new Router()
const {playerController} = require('../controllers')

router.post('/', playerController.create)
router.put('/:id', playerController.update)
router.get('/', playerController.getAll)
router.get('/:id', playerController.getOne)
router.delete('/:id', playerController.delete)

module.exports = router