const router = require('koa-router')();
const dbHelper = require('../utils/dbHelper');

router.prefix('/article');

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
});

router.get('/list', async (ctx, next) => {
    const dbtest = new dbHelper.DBhelper("article");
    const query = () => {
        return new Promise((resolve, reject) => {
            dbtest.selectWhere(function(result) {//select操作
                resolve(result);
            });
        })
    };
    const result = await query();
    ctx.body = result;
});

module.exports = router;
