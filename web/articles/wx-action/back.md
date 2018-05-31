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
