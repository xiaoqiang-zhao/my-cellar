# Java 自学 - 备忘附录

## 卸载 JDK

```shell
sudo rm -fr /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -fr /Library/PreferencesPanes/JavaControlPanel.prefPane
sudo rm -fr ~/Library/Application\ Support/Java
```

请勿尝试通过从 /usr/bin 删除 Java 工具来卸载 Java。此目录是系统软件的一部分，下次对操作系统执行更新时，Apple 会重置所有更改。

上面是官网的卸载步骤，按照上面的卸载完后，要从finder中进入 /Library/Java/JavaVirtualMachines，然后删除jdk，这样才算彻底卸载完成。

## IDE 

Ultimate(企业加工板)
For web and enterprise development (企业版开发工具)
DOWNLOAD
Free trial(免费试用)

Community(社区版)
For JVM and Android development ()
DOWNLOAD
Free, open-source (免费开源)

## 依赖管理

maven 与 npm 对比
- 国内 maven 要慢很多，淘宝镜像 [参考](https://www.zhihu.com/question/61023837)
- 源码与二进制包的不同形式 [参考](https://codeday.me/bug/20181204/432991.html)
- maven 比 git 和 npm 早

maven 和 gradle 对比
- gradle Ant 几乎销声匿迹、Maven 也日薄西山，而 Gradle 的发展则如日中天 [参考](https://www.cnblogs.com/huang0925/p/5209563.html)
- maven 依然是主流 [参考](https://zhuanlan.zhihu.com/p/21394120)
- IntelliJ IDEA上创建Maven Spring MVC项目 [参考](https://www.cnblogs.com/Sinte-Beuve/p/5730553.html)
