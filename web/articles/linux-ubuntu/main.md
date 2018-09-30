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

首先是 git，有了 git 才有代码：

```shell
# 安装 git
sudo apt-get install git
# 设置用户名和邮箱
git config --global user.name 'xiaoqiang-zhao'
git config --global user.email 'email@example.com'
# ssh 为了不用每次提交都输用户名和密码，最好将 ssh 配上：
# https://help.github.com/articles/connecting-to-github-with-ssh/

# 克隆远程仓库
# Github获取远程库时，有 ssh 方式和 https 方式
# 两个方式的url地址不同，认证方式也不同，使用 ssh 时保存密钥对以后可以不再输入帐号密码，而 https 却不能。
git clone git@github.com:xiaoqiang-zhao/my-cellar.git
```

然后是 IDE，写代码，我用的是 VS Code: 

```shell
# 需要先安装 umake
sudo add-apt-repository ppa:ubuntu-desktop/ubuntu-make
sudo apt-get update
sudo apt-get install ubuntu-make
# 安装 VS Code
umake web visual-studio-code
# 如果不需要 IDE 了可以将其卸载
umake web visual-studio-code --remove
```

NodeJs 也是必不可少的：

```shell
sudo apt-get install nodejs
sudo apt install nodejs-legacy
# npm 需要单独安装
sudo apt install npm
# 然后发现 node 版本是 4.x，需要升级到最新
sudo npm install -g cnpm
sudo cnpm instal -g n
sudo n latest
```

## 基本快捷键

快速启动应用：Win + A，没有像 Windows 下那样的“我的程序”，更像 Mac 的 Spotlight。

## 一些奇怪的问题

### 分辨率

问题描述：可视区变窄两边有黑边，又无法通过图形化工具选到合适的分辨率。

方案一：

1、查看可用分辨率：`xrandr` ；

2、如果没有可用分辨率可以添加你想要的分辨率：`xrandr --addmode 显卡名 1366×768`；

3、设置输出分辨率：`sudo xrandr --output LVDS-1 --mode 1366x768`。

上面方法虽然可以解决问题，但是在原理上是每次启动的时候强制设置分辨率，有没有更彻底一点的方案呢？一番搜索后还真有，出现这种问题多数是集成显卡和独立显卡同时存在，集成显卡一般比较弱但是系统自动配置了集成显卡作为默认启动项，这时需要将启动项改为独立显卡，方法如下：


方案二：

用 `lspci -k | grep -A 2 -i "VGA"` 命令查看显卡的硬件配置，在 System Setting/Detail 下可以查看当前系统用的是哪一块显卡，然后用 `sudo ubuntu-drivers devices` 命令查看驱动推荐，找到 recommended 的那一项进行安装，比如我的是 nvidia-384，用 `sudo apt-get install nvidia-384` 命令安装独立显卡驱动，重启后查看当前系统用的是哪一块显卡，如果还是集成显卡，用 `nvidia-settings` 命令切换。

## 参考文章

[显卡设置](http://blog.csdn.net/Yan_Chou/article/details/72847943)
