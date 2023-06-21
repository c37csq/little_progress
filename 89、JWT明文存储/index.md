### JWT是明文存储

header: 将数据进行base64编码

可以使用atob函数进行解密。
header储存的是签名算法 { "alg": "HS256", type: "JWT" }

payload: 也是base64编码
可以使用atob进行解密

signature: 使用HS256进行加密。
防止篡改数据和伪造数据，验证数据。