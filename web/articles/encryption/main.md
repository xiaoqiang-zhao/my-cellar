# 加密

## 理论部分

### 散列算法

散列算法(签名算法)，一种不可逆加密，用于验证，防止信息被修。具体用途如：文件校验、数字签名、鉴权协议。较成熟的算法有：MD5、SHA1、HMAC。

### 对称性加密算法

加密和解密使用同一个密钥，可用来对敏感数据等信息进行加密。对称性加密算法有 AES、DES、3DES。

### 非对称算法

加密和解密所使用的不是同一个密钥，通常有两个密钥，称为"公钥"和"私钥"，它们两个必需配对使用，否则不能打开加密文件。发送双方 A,B 事先均生成一堆密匙，然后A将自己的公有密匙发送给B，B将自己的公有密匙发送给 A，如果 A 要给 B 发送消息，则先需要用 B 的公有密匙进行消息加密，然后发送给 B 端，此时 B 端再用自己的私有密匙进行消息解密，B 向 A 发送消息时为同样的道理。非对称性算法有 RSA、DSA、ECC。

## 代码部分

### 散列算法

### AES

官网给的示例中，加密相同的内容每次加密出的结果是不一样的，如果要解决这个问题需要把 mode、iv、padding 三个参数指定:

```js
import CryptoJS from 'crypto-js';

const eKey = CryptoJS.enc.Latin1.parse('1234567812345678');
var ciphertext = CryptoJS.AES.encrypt('abc123', eKey, {
    mode: CryptoJS.mode.CBC,
    iv: CryptoJS.enc.Latin1.parse('1234567812345678'),
    padding: CryptoJS.pad.ZeroPadding
});
var result = ciphertext.toString();
console.log(result);
```

在一些行业中图片的加密十分常见的(尤其是医疗行业)，

```js
import CryptoJS from 'crypto-js';

// 加密解密配置参数
const eKey = CryptoJS.enc.Latin1.parse('bCaAVxExr7TosLJx');
const options = {
    mode: CryptoJS.mode.CBC,
    iv: CryptoJS.enc.Latin1.parse('8eRWWEfWAwFDdqUR'),
    padding: CryptoJS.pad.ZeroPadding
};

const filedir = './timg-f.jpg';
const c = fs.readFileSync(filedir);            
const data = new Buffer(c).toString('base64');

// 加密
let encrypted = CryptoJS.AES.encrypt(data, eKey, options).toString();
// console.log('加密后的部分内容:', encrypted.slice(0, 100));

// 解密
const decryptResult = CryptoJS.AES.decrypt(encrypted, eKey, options);
const decryptResultUtf8 = decryptResult.toString(CryptoJS.enc.Utf8);
// console.log('解密后的部分内容:', decryptResultUtf8.slice(0, 100));

// 图片在页面展示
let img = new Image();
img.src = 'data:image/jpeg;base64,' + decryptResultUtf8;
img.style.width = '600px';
document.body.append(img);
```

## 参考文章

[加密算法(DES,AES,RSA,MD5,SHA1,Base64)比较和项目应用, 各种加密算法比较](https://blog.csdn.net/guyue35/article/details/81872115)

[crypto-js](https://www.npmjs.com/package/crypto-js)

[AES加密CBC模式兼容互通四种编程语言平台【PHP、Javascript、Java、C#】](https://my.oschina.net/Jacker/blog/86383)
