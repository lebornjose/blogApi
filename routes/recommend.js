const router = require('koa-router')();
const controller = require('../controller/c-recommend');


router.prefix('/api/recommend');

router.get('/list', controller.postPostsPage);

module.exports = router;
