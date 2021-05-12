// 文章类型分类
const categoryModel = require('../lib/mysql.js');

exports.postPostsPage = async ctx => {
  await categoryModel.findCategorys()
    .then(result => {
      console.log('1111');
      console.log(result)
      console.log(ctx)
      ctx.body = {
        code: 0,
        data: result,
      }
    }).catch((err) => {
      console.log(err)
      ctx.body = 'error'
    })
};
