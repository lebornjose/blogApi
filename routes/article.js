const router = require('koa-router')();
const controller = require('../controller/c-article');

router.prefix('/api/article');

router.get('/list/:page', controller.postPostsPage);

router.get('/detail/:id', controller.getArticle);

module.exports = router;
