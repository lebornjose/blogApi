const jwt = require('jsonwebtoken');

function Verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secretkey', (err) => {
      if (err) { // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
        resolve(0)
      } else {
        resolve(1)
      }
    });
  });
};

exports.Verify = Verify;
