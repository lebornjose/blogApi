// 文章类型分类
const categoryModel = require('../lib/mysql.js');

exports.postPostsPage = async ctx => {
  await categoryModel.findCategorys()
    .then(result => {
      ctx.body = {
        code: 0,
        data: result,
      }
    }).catch(() => {
      ctx.body = 'error'
    })
};

exports.postNum = async ctx => {
  const arr = [];
  try {
    let list = await categoryModel.findCategoryIds();
    for(let i = 0; i < list.length; i++) {
      const categoryId = list[i].category_id;
      let total = await categoryModel.countArticleCategory(categoryId);
      arr.push({id: categoryId, title: list[i].title, total: total[0].total});
    }
    ctx.body = {
      code: 0,
      data: arr,
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      message: '系统错误'
    }
  }
};
