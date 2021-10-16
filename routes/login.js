const router = require('koa-router')();
const controller = require('../controller/c-login');

router.prefix('/api/login');

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
});

router.post('/toLogin', controller.postPostsPage);

module.exports = router;
