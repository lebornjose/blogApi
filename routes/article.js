const router = require('koa-router')();
const mysql = require('mysql');
const config = require('../config/default');

router.prefix('/article');

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
});

router.get('/list', (ctx, next) => {
    const pool = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'huangxing',
        database:'blog'
    });
    pool.query('SELECT * FROM `article`', (err, data, fields) => {
        // if (err) return;
        console.log('1221121212')
        console.log(err);
        console.log(data);
        ctx.body = '32323';
    });
    pool.end();
});

module.exports = router;
