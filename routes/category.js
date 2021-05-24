const router = require('koa-router')();
const controller = require('../controller/c-category');

router.prefix('/api/category');

router.get('/list', controller.postPostsPage);

module.exports = router;
