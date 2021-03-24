// 文章列表页面
const userModel = require('../lib/mysql.js');
/**
 * 首页分页， 每次输出10条
 */
exports.postPostsPage = async ctx => {
  let page = ctx.params.page || 1;
  await userModel.findPostByPage(page)
    .then(result => {
      ctx.body = result
    }).catch(() => {
      ctx.body = 'error'
    })
};
