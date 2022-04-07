# 记录微信公众号开发遇到的坑

## 扫码

### 问题

掉不起扫码页面，开启 debugger 模式。

绑定的时候报 {"errMsg":"config:ok","verifyJsApiList":["scanQRCode"]} 

操作的时候报 {"errMsg":"scanQRCode:the permission value is offline verfying"}

### 解决方案

https://github.com/yoowinsu/blog/issues/72

### 参考内容

官方资料: 
https://developers.weixin.qq.com/community/develop/doc/000a24a11e8c786fdf29b6dc659c09?_at=1597650184356
https://developers.weixin.qq.com/community/develop/doc/0002aaa1c20e90ad09da1565856800

博客资料: 
https://blog.csdn.net/qq_43485006/article/details/108521522
https://www.xianyuew.com/kxjs/7038096.html

## 图片选择

### 问题

当你想上传图片，除了 jpeg 和 png 的图片不想要其他格式，这网页和微信的开发者模拟器中看到是没有问题的。但是真机测试的时候发现失效了，什么图片格式都可以传上来。

```js
<input type="file" accept="image/png, image/jpeg"/>
```

### 解决方案

方案一: 改需求，允许任何格式的图片，这也是官方期望的；

方案二: 在选择的时候无法置灰，只能在选择之后拦截；

```js
/**
  * 
  * @param file 图像上传前的校验
  * @returns 
  */
function beforeUpload(files: any[]) {
  // 判断数量
  if (fileList.length >= 5) {
    if (isLock === false) {
      Toast.show(`最多可上传5张图片`);
    }
    isLock = true;
    return null;
  }
  else {
    isLock = false;
  }
  // 判断大小，不超过 10M (10 * 1000 * 1000)
  const filesResult: any[] = [];
  files.forEach(item => {
    if (item.size > 10000000 || ['image/jpeg', 'image/png'].indexOf(item.type) === -1) {
      failList.push(item.name);
      setFailList([...failList]);
    }
    else {
      filesResult.push(item);
    }
  });

  return filesResult;
}
```

### 延伸思考

初看以为是微信还不完善，但是当我用手机自带的 safair 打开时发现也不支持，转而用我装的 chrome，哎，神奇的也不行。原来错怪微信了。

再去 can i use 一搜，发现果然支持不完全: https://caniuse.com/?search=input%20accept

微信的浏览器内核是什么？

微信现在都是使用 xweb 内核，不使用x5内核了。xweb 内核已经同步到 chromiun 78 的水平。 -- 2020.10.20

### 参考内容

微信官方对问题的回应: https://developers.weixin.qq.com/community/enterprisewechat/doc/000cea741e8908e26fba8b59e57800

MDN 的官方信息: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file

关于微信内核: https://developers.weixin.qq.com/community/develop/doc/0006ee963208c0338c7d3e3695bc00?highLine=%25E6%25B5%258F%25E8%25A7%2588%25E5%2599%25A8%25E5%2586%2585%25E6%25A0%25B8
