// 文章列表页面
const userModel = require('../lib/mysql.js');
/**
 * 首页分页， 每次输出10条
 */
exports.postPostsPage = async ctx => {
  let page = ctx.params.page || 1;
  let total = 0
  await userModel.totalArticle()
    .then(result => {
      total = result[0].count
    })
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
