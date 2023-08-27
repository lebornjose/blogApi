const OSS = require('ali-oss');
const path = require('path');
let fs = require('fs');
const multer = require('koa-multer');
const ossConfig = require('../config/oss.config.js');

// ossConfig
// {
//   accessKeyId: 'xxxx',
//   accessKeySecret: 'xxxx',
//   bucket: 'xxx',
//   region: 'xxxxx'
// };
let client = new OSS(ossConfig);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname ,'/public'))
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
});

exports.upload = async (ctx, next) => {
  if ('POST' !== ctx.method) return await next();
  let file = ctx.request.files.file;
  try {
    const reader = fs.createReadStream(file.path);
    const myDate = new Date();
    var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
    await client.putStream(`article-img/${newFilename}`, reader);
    ctx.body = {
      code: 0,
      message: '上传成功'
    }
  } catch (err) {
    ctx.body = {
      code: -2,
      message: '上传失败'
    }
  }
};


