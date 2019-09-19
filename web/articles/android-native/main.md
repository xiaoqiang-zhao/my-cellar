# Android Native

> Android 原生 App 自学笔记。

## 概要

2007.11.05 谷歌推出。

Android 是操作系统，基于 Linux，原产于名为 Android.Inc 的一家独立公司，2005 年被谷歌收购。Android Native 是运行在该系统上的一种应用形式。

主要版本:
- Android 1.1, 发布于 2008.09
- Android 2.0, 发布于 2009.10.26, 代号 Eclair(松饼)
- Android 3.0, 发布于 2011.02.03, 代号 Honeycomb(蜂巢)
- ...
- Android 9.0, 发布于 2018.05.09, 代号 Pie(派)
- Android 10.0(Android Q), 预计今年到达战场，之后不会再按照基于美味零食或甜点的字母顺序命名，而是转换为版本号。开始提供系统级的黑暗模式，大部分预装应用、抽屉、设置菜单和 Google Feed 资讯流等界面和按钮，都会变成以黑色为主色调，就和你在 macOS Mojave 中看到的暗色界面一样。

经过 10 年 10 个版本的更新，之前的很多问题现在已经不是问题了，我们需要跟着最新的教程来学。Android Native 的开发整体再走下坡路，新教程比较少，只能把网上零散的资料拼接起来。

## IDE 的选择

看了最近几年国外的一下文章，IntelliJ IDEA 和 Android Studio 是全世界 Android 开发者比较推荐的，前者收费后者免费，再结合教程的丰富程度选择了 Android Studio。

官网: https://developer.android.com/studio

遇到的问题:

- Unable to access Android SDK add-on list

由于国内网络环境 Android SDK 和其他一些组件安装失败，搞到很晚没解决，最可气的是官方说不应该有这问题，看来外国人不了解我天朝上国，第二天有点忙在夜深人静的时候开始研究，试着卸载重装居然通过了。我的梯子很给力。

## Phone, hello world

 2016 年之前 Android Native 的开发语言只有 Java 可选，2016年2月15日发布了 Kotlin。这比较像当年的 Objective-C 和 Swift，Objective-C 是 1980 发明的语言，它进入大众视野是伴随 2007 年第一代 Iphone 的发布。Swift 是 2014 年发布的，面对领先 7 年的 Objective-C，经过 5 年的追赶依然被压一头(可以参考 2019.07 (PYPL)[http://pypl.github.io/PYPL.html] 发布的全球语言受欢迎排行榜)。所以我们当下不打算进入 Kotlin 的学习，而是依然以 Java 为主。

Android Studio 第一映像很不错，第一次进入有多种应用可以选择:
- Phone and Tablet, 手机和平板
- Wear OS, 智能手表
- TV
- Andriod Auto, 车载应用
- Andriod Things, 嵌入式设备应用(自动售货机, 智能门禁, 物联网)

选择 Phone and Tablet，任意选择一个模板，选择一下 Java 语言和 Android 9.0，一个项目就生成了，下载依赖需要一些时间耐心等待。在 /app/src/main/res/layout 下就是页面了(注意左上角有 Android 和 Project Files 等多种显示模式)，点开可以大体预览页面。有安卓机的可以直接真机调试，配置如下:

- 1. Android Studio，顶部 app / Edit / USB Device。
- 2. 手机上打开设置，点开”开发者选项“，将”USB调试打开“。
- 3. Android 4.2 以后的系统可以隐藏”开发者选项“，点击“关于手机”，然后连续多次点击“版本号”，可以将”开发者选项“的隐藏取消掉，返回设置中就可以看到了。

连上手机之后运行的时候报 “Session 'app': Installation did not succeed.”

手头没有真机的可以先用模拟器玩着，这里介绍外挂 Genymotion 模拟器，配置方法如下:
- 1. 安装 VirtualBox，从 https://www.virtualbox.org/wiki/Downloads 下载
- 2. 安装 Genymotion，从 https://www.genymotion.com/download/ 下载 Genymotion。下载是要用邮箱注册账号后才能下载。
- 3. 启动 Genymotion 并登录，Next。
- 4. accept agreement, Next.
- 5. 选择手机安装，比如选择 Samsung Galaxy S10，409M 装的比较慢，手机类型并不全，集中在 Samsung、Google、HTC。

## 参考

[最新最全面的Android学习指南](https://zhuanlan.zhihu.com/p/70005857)

[What are the best IDEs for Android development?](https://www.slant.co/topics/1321/~best-ides-for-android-development)

[Top 10 Android Development Tools 2018](https://www.amarinfotech.com/best-android-development-tools-2018.html)

[Android - Hello World Example](https://www.tutorialspoint.com/android/android_hello_world_example.htm)

[配色学习](https://www.zhihu.com/question/22148127/answer/730635611)

[Swift vs Objective-C in 2019](https://medium.com/swiftify/swift-vs-objective-c-comparison-32aba9dad4e3)

[Android Studio 模拟器的选择和安装](https://blog.csdn.net/qq_33505204/article/details/78452286)
