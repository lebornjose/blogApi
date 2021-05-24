const mysql = require('mysql');
const config = require('../config/default.js');

const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  port: config.database.port
});

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject({code: 500, err: err} )
          } else {
            resolve(rows);
          }
          connection.release()
        })
      }
    })
  })
};

// 查询文章列表
exports.findPostByPage = ( page ) => {
  const _sql = `SELECT * FROM article ORDER BY article_id DESC LIMIT ${(page-1)*20},20;`;
  return query(_sql);
};
// 查询文章条数
exports.totalArticle = () => {
  const _sql = `SELECT COUNT(*) as count from article`;
  return query(_sql);
};
// 查询文章分类
exports.findCategorys = () => {
  const _sql = `SELECT * FROM category LIMIT 0, 20`;
  return query(_sql);
};

// 查询
exports.findRecomment = () => {
  const _sql = `SELECT * FROM recommend  ORDER BY commend_id desc`;
  return query(_sql);
}
