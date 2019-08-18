# Java 自学 - 备忘附录

## 卸载 JDK

```shell
sudo rm -fr /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -fr /Library/PreferencesPanes/JavaControlPanel.prefPane
sudo rm -fr ~/Library/Application\ Support/Java
```

请勿尝试通过从 /usr/bin 删除 Java 工具来卸载 Java。此目录是系统软件的一部分，下次对操作系统执行更新时，Apple 会重置所有更改。

上面是官网的卸载步骤，按照上面的卸载完后，要从finder中进入 /Library/Java/JavaVirtualMachines，然后删除jdk，这样才算彻底卸载完成。
