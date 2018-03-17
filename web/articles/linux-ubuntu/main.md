# Ubuntu 入门基础

> 把老电脑装了 Ubuntu 用来学习 Linux，记录一下学习历程。

## Chrome 和 翻墙

首先要做的就是装个 Chrome，因为 Chrome 的搜藏夹是我的外挂，然后翻个墙。

```shell
# 首先 Ctr + Alt + T 打开命令行
# 然后下载安装包
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb 
# 再然后安装
sudo dpkg -i google-chrome*; sudo apt-get -f install
# 最后启动
/usr/bin/google-chrome-stable
# 经常使用的 Application 可以 lock 到 Launcher 中，
# 翻墙配置在 System Settings/Network/Network proxy 下，使用 Automatic 配置 pac 链接即可。
```

这也是 Linux 下经典的软件安装方法，没有图形化界面的时候，其他软件也可以像这样安装和使用。

## 定制系统

首先将左边的面板调小一点: System Setting/Appearance/Launcher icon size;

顺便换个壁纸: System Setting/Appearance;

再将触摸板的方向调成和 Mac 一样: System Setting/Mouse & Touchpad/Natural scrolling;

最后设置程序全屏时隐藏侧边栏: System Setting/Appearance/Behaviour/Auto-hide the Launcher。

## 开发环境

首先是 git：`sudo apt-get install git`;

然后是 IDE，我用的是 VS Code: 

## 基本快捷键

快速启动应用：Win + A，没有像 Windows 下那样的“我的程序”，更像 Mac 的 Spotlight。


## 一些奇怪的问题

### 分辨率

问题描述：可视区变窄两边有黑边，又无法通过图形化工具选到合适的分辨率。

解决方案：

1、查看可用分辨率：`xrandr` ；

2、如果没有可用分辨率可以添加你想要的分辨率：`xrandr --addmode 显卡名 1366×768`；

3、设置输出分辨率：`xrandr --output 显卡名 1366×768`。
