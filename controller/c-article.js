// 文章列表页面
const jwt = require('jsonwebtoken');
const userModel = require('../lib/mysql.js');
const Verify = require('../utils/verify.js');
/**
 * 首页分页， 每次输出10条
 */
exports.postPostsPage = async ctx => {
  const token = ctx.cookies.get('token');
  const isLogin = await Verify.Verify(token);
  if(!isLogin) {
    return ctx.body = {
      code: -1,
      message: '登录过期'
    };
  }
  // jwt.verify(ctx.cookies.get('token'));
  let page = ctx.params.page || 1;
  let total = 0;
  await userModel.totalArticle()
    .then(result => {
      total = result[0].count
    });
  await userModel.findPostByPage(page)
    .then(result => {
      ctx.body = {
        code: 0,
        data: result,
        total: total
      }
    }).catch((err) => {
      console.log(err)
      ctx.body = 'error'
    })
};
