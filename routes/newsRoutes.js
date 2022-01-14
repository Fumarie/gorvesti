const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')

router.get('/', newsController.getAllNews)
router.post('/parse', newsController.parseNews)

module.exports = router