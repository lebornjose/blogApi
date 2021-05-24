const recommendModel = require('../lib/mysql.js');

exports.postPostsPage = async ctx => {
  await recommendModel.findRecomment()
    .then(result => {
      ctx.body = {
        code: 0,
        data: result,
      }
    }).catch((err) => {
      console.log(err)
      ctx.body = 'error'
    })
};
