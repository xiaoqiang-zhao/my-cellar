# 微信小程序开发记要

> 要实验一中商业模式，需要小程序来支持，这里记录从零开始的关键步骤。

## 注册

注册一个微信小程序公众号，包括账号注册和管理员信息登记，管理员信息登记很重要，因为管理员才有权限发布小程序、设置开发版的体验用户等。请注意，公共号注册时选择小程序，不是通常认为的公众号。

官方详细文档：[https://developers.weixin.qq.com/miniprogram/dev/index.html](https://developers.weixin.qq.com/miniprogram/dev/index.html)

这里有个坑，微信公众平台和微信公众号需要两个不同的邮箱注册，坑爹的是如果你用同一个邮箱注册也能注册成功，但是以后你就永远也进不了小程序的管理界面了。

## 开发工具

下载开发者工具：[https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=2018428](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=2018428)，用小程序ID创建一个 Hello World，很容易的就跑起来了。

## 数据库接入

如果只是展示一些静态页面上面的操作很简单，如果要接入动态数据就需要多费些手脚了，好在腾讯提供了不少基础设施，在开发阶段不需要购买服务，想上线的话半年400人民币。

接入文档：https://developers.weixin.qq.com/miniprogram/dev/qcloud/qcloud.html

## 测试体验

需要一个功能比较完整的程序才成发布测试，否则审核不给过。如果是小范围内固定几个人的测试，有一个变通的办法，把这几个人设置成开发人员不需要发布就可以看到。

## 功能点简要整理

### 定制

*顶部 bar*

顶部 bar 的颜色可以定制，不可以在左侧加图标和按钮。详情见此文档：https://developers.weixin.qq.com/miniprogram/dev/framework/config.html。

右侧的更多按钮下拉列表不可以定制，只有“转发|关于|取消”三个按钮，其中的转发可以配置回调函数，转发小程序或者转发小程序中的某个页面。
