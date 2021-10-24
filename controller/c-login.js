// 用户登录
const categoryModel = require('../lib/mysql.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
exports.postPostsPage = async ctx => {
  const rb = ctx.request.body;
  const pwd = crypto.createHash('md5').update(rb.pwd).digest('hex');
  await categoryModel.findUser(rb.username, pwd)
    .then(result => {
      if(!result.length) {
        return ctx.body = {
          code: -2,
          message: '用户名或密码错误'
        }
      }
      const user = {uid: result[0].uid};
      jwt.sign(user,"secretkey",{ expiresIn: '30day' },(err,token) => {
        ctx.cookies.set('token',token);
      });
      ctx.body = {
        code: 0,
        message: '登录成功'
      }
    }).catch((err) => {
      console.log(err)
      ctx.body = 'error'
    })
};
