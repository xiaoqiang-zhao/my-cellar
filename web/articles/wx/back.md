# 素材

## 屏幕分辨率研究

rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

iPhone5      320  Dpr:2   1px = 2.34rpx

iPhone6      375  Dpr:2   1px = 2rpx

iPhone6 Plus 414  Dpr:3   1px = 1.81rpx

iPhone7      375  Dpr:2   1px =  2rpx

iPhone7 Plus 414  Dpr:3   1px = 1.81rpx

iPhone8      375  Dpr:2   1px =  2rpx

建议： 开发微信小程序时设计师可以用 iPhone6 作为视觉稿的标准。

计算公式：(375/width)*Dpr，单位 rpx/px，width 表示设计稿的宽度除以Dpr

ppi，每一英寸的像素数目。

https://www.apple.com/cn/iphone-7/specs/

https://www.jianshu.com/p/221bebfae266

https://www.zhihu.com/question/25388683/answer/393230091

## iconfont

不支持引入字体文件，需要通过工具将字体文件转成 base64 后直接写进样式文件，[参考文章](https://www.jianshu.com/p/221bebfae266)。

转 base 64 工具：https://transfonter.org/

## 双向绑定

微信小程序中的 data 并不是双向绑定的，如果想触发页面上的更新，需要用 setData 方法触发。

````js
this.setData({
    isActivedSearch: true
});
````

## 样式 class 的增删

也没有提供像 Vue 中动态 class 语法，需要在标签上直接写大括号语法

````css
<div class="item {{actived ? 'actived' : ''}}">
</div>
````

## 图片

微信小程序限制不超过 2M，有 2-3 张高清 banner 图就超过限制了，租用图片服务器是最直接的方式，但是我发现了一个更省钱的方式，将图片上传到公众号的素材管理中，可以直接使用先上图片。我猜图片存储是腾讯的基础设施，腾讯内部不同应用之间不会触发防盗链。
