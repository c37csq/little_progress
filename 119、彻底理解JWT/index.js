const crypto = require('crypto');

// 签名
function sign(info, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(info);
  return hmac.digest('hex');
}

function jwt(info, key) {
  const header = {
    type: 'JWT',
    alg: 'HS256'
  }
  const headerStr = Buffer.from(JSON.stringify(header)).toString('base64');
  const payloadStr = Buffer.from(JSON.stringify(info)).toString('base64');
  const signStr = sign(headerStr + '.' + payloadStr, key).toString('base64').replace(/=/g, '');
  return headerStr + '.' + payloadStr + '.' + signStr;
}

const KEY = '123456';
console.log(sign('陈大思', KEY));
const result = jwt({ name: '陈大思', age: 23 }, KEY);
console.log(result);