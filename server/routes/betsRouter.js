const Router = require('express')
const router = new Router()
const {betController} = require('../controllers')

router.post('/', betController.create)
// router.put('/:id', betController.update)
router.get('/', betController.getAll)
// router.get('/:id', betController.getOne)
router.delete('/:id', betController.delete)

module.exports = router