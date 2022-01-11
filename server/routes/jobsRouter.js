const Router = require('express')
const router = new Router()
const {jobController} = require('../controllers')

router.post('/', jobController.create)
router.put('/:id', jobController.update)
router.get('/', jobController.getAll)
router.delete('/:id', jobController.delete)

module.exports = router