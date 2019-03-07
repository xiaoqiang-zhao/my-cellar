# electron-vue 使用备忘

> 挖到宝贝了

## 初始化

```shell
vue init simulatedgreg/electron-vue my-project
```

## 构建方式的选择

electron-packager
如果你刚开始制作 electron 应用程序或只需要创建简单的可执行文件，那么 electron-packager 就可以满足你的需求。

electron-builder
如果你正在寻找完整的安装程序、自动更新的支持、使用 Travis CI 和 AppVeyor 的 CI 构建、或本机 node 模块的自动重建，那么你会需要 electron-builder。

## 加入苹果开发者

```js
Your account does not have permission to create Developer ID Application certificates.
```

https://developer.apple.com/support/developer-id/

有两种打包方式，一种是走开发者账号，用这种方式的优点是开发出的包可以上 App Store，缺点是需要花钱，每年 688 RMB。另一种是用 Apple ID 生成证书，打出的包通过文件的形式发行。

Mac: 用苹果的 app store 账号自己生成签名和证书
Windows: 的用的公司的签名平台 certificates

## 参考

[electron-vue](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)

[npm run build 的坑](https://segmentfault.com/a/1190000012899824)
