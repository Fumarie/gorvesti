const Router = require('express')
const router = new Router()

const newsRouter = require('./newsRoutes')

router.use('/news', newsRouter)

module.exports = router