const Router = require('express')
const router = new Router()
const pong = require('./ping-pong')
const locationsRouter = require('./locationsRouter')
const employeesRouter = require('./employeesRouter')
const playersRouter = require('./playersRouter')
const tablesRouter = require('./tablesRouter')
const gamesRouter = require('./gamesRouter')
const jobsRouter = require('./jobsRouter')
const betsRouter = require('./betsRouter')
const betsTypesRouter = require('./betsTypesRouter')


router.use('/ping', pong)
router.use('/locations', locationsRouter)
router.use('/employees', employeesRouter)
router.use('/players', playersRouter)
router.use('/tables', tablesRouter)
router.use('/games', gamesRouter)
router.use('/jobs', jobsRouter)
router.use('/bets', betsRouter)
router.use('/betsTypes', betsTypesRouter)


module.exports = router
