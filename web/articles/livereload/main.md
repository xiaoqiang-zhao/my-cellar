# livereload

> 实时自动刷新页面来开发

livereload的基本原理是试用node开启一个websocket服务，并且检测文件变化，浏览器打开一个页面时候，引入固定的livereload.js（chrome插件会帮忙加上）会建立ws请求，当node检测到文件变化，则自动推送消息给浏览器，实现刷新。

## 参考网站

[Gulp.js-livereload](http://cnodejs.org/topic/53427d16dc556e3b3901861e)

[JavaScript](http://ju.outofmemory.cn/entry/46544)

[Grunt.js-livereload](http://js8.in/2013/04/07/%E5%8F%8C%E5%B1%8F%E5%88%87%E5%9B%BE%EF%BC%9A%E4%BD%BF%E7%94%A8livereload%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%8A%A8%E5%88%B7%E6%96%B0/)