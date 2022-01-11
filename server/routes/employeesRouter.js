const Router = require('express')
const router = new Router()
const {employeeController} = require('../controllers')

router.post('/', employeeController.create)
router.put('/:id', employeeController.update)
router.get('/', employeeController.getAll)
router.get('/croupiers', employeeController.getCroupiers)
router.get('/:id', employeeController.getOne)
router.delete('/:id', employeeController.delete)

module.exports = router