const router = require('koa-router')();
const controller = require('../controller/c-article');

router.prefix('/article');

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
});

router.get('/list/:page', controller.postPostsPage);

module.exports = router;
