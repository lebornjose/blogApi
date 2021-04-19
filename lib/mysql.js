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
  const _sql = `SELECT * FROM article LIMIT ${(page-1)*20},20;`
  return query(_sql);
};

exports.totalArticle = () => {
  const _sql = `SELECT COUNT(*) as count from article`;
  return query(_sql);
};
