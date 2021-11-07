const router = require('koa-router')();
const controller = require('../controller/c-upload');

router.prefix('/api/upload');

router.post('/image', controller.upload);

router.get('/text', async ctx => {
  ctx.body = {
    code: 0,
  }
});

module.exports = router;
