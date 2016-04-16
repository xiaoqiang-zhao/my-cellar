# fis3 备忘笔记

> 项目中紧急使用，记录一些坑和命令。

## fis3 release

`release`会将资源加工后推送到某一个临时文件夹

	fis3 release

指定临时文件的输出目录

	// 编译产出到一个特定的目录
	fis3 release -d ./output
	// 发布到当前命令执行目录下的 output 目录下。
	fis3 release -d ../output
	
生成非压缩调试版资源

	fis3 release rd

监听文件改变，自动刷新页面

	fis3 release rd -wL

启用文件格式检测,--lint,-l

	fis3 release -l

清除编译缓存
	
	fis3 release -c

启用独立缓存

	fis3 release -u
	
## fis3 server

启动服务，加载上面临时文件夹中的资源，所以两个项目同时启动时可能会出现互串的问题

	fis3 server start

获取临时文件夹的信息

	fis3 server info

这是需要一个清理临时文件夹，重新生成的命令

	fis3 server clean

查看临时文件夹确定是否清理成功，可以用下面命令

	fis3 server open

关闭服务

	fis server stop

重启服务
	
	fis server restart

