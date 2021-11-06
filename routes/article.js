const router = require('koa-router')();
const controller = require('../controller/c-article');

router.prefix('/api/article');

router.get('/list/:page', controller.postPostsPage);


module.exports = router;
