# 前端测试

> 相对于后端测试前端测试是成本非常高的，后端功能性测试是API测试，而前端功能性测试包含3个方面：AIP测试、节点测试、图形测试。本文会逐个介绍，并且给出能运行的 Demo。

## API 测试

API 测试框架比较有名的是 Jasmine 和 Mocha，前者大而全是 Vue 等现代框架推荐的测试框架，后者是 TJ 大神开发的插件式测试框架；前者入门简单，后者插件众多功能齐全。API 测试适用于 Node.js 的项目 和 与浏览器无关的纯功能函数或库测试。

注：这里我们跳过了 TDD（Test Driven Development ）测试框架，如 JQuery 用的测试框架 QUnit，直接进入 
BDD（行为驱动开发，Behaviour Driven Development）时代。BDD 与 TDD 的主要区别是，使得非程序人员也能参与到测试用例的编写中来。

### Jasmine

准备工作，在工程目录下准备一个 package.json，然后运行下面的命令，我们就可以得到一个 spec 目录，spec 下有 support/jasmine.json 文件，它是 jasmine 的配置文件。

    // 全局安装，方便在命令行中直接使用
    $ npm install -g jasmine
    npm install jasmine --save-dev
    $ jasmine init

写代码，这一趴我们先写功能代码，再写测试，功能代码是4则运算的加和乘：

    /** 
     * @file operation.js 功能代码
     */
    module.exports = {
        // 加法
        add: function (a, b) {
            return a + b;
        },
        // 乘法
        mult: function (a, b) {
            return a * b;
        }
    };
    
    /**
     * @file spec/operationSpec.js 测试代码
     */
     var operation = require('../operation');
     
     describe('四则运算测试', function() {
         it('加法测试', function() {
             var result = operation.add(1, 1);
             expect(result).toEqual(2);
         });
     
         it('乘法测试', function () {
             var result = operation.mult(1, 1);
             expect(result).toEqual(1);
         });
     });
    
运行测试
    
    jasmine spec/operationSpec.js

在控制台就可以看到测试结果

    Started
    ..
    
    2 specs, 0 failures
    Finished in 0.006 seconds

[官网](https://jasmine.github.io/)

### Mocha

准备工作

    // 全局安装，方便在命令行中直接使用
    $ npm install -g mocha
    npm install mocha --save-dev
    // 断言库
    npm install chai --save-dev

写代码，功能代码直接将上面的 operation.js 拷贝下来；关于测试代码，先建文件夹 test，再在其中添加文件 operation.test.js 
    
    /**
     * @file operation.test.js 测试脚本
     */
    var expect = require('chai').expect;
    var operation = require('../operation');
    
    describe('四则运算测试', () => {
        it('加法测试', () => {
            var result = operation.add(1, 1);
            expect(result).to.be.equal(2);
        });
    
        it('乘法测试', () => {
            var result = operation.mult(1, 1);
            expect(result).to.be.equal(1);
        });
    });

运行测试
    
    mocha

在控制台就可以看到测试结果

    四则运算测试
      ✓ 加法测试
      ✓ 乘法测试

    2 passing (9ms)

[官网](https://mochajs.org/)

### 其他

ava 自称"面向未来的测试框架"，对 IO 繁重的测试特别有用，速度快于 Mocha。[ava GitHub](https://github.com/avajs/ava) [中文资料](https://www.awesomes.cn/repo/sindresorhus/ava)

## 节点测试

### Nightwatch

准备工作，

    npm i nightwatch --save-dev
    npm i nightwatch -g

我们还需要安装浏览器驱动管理，这样我们就可以在一个地方管理多个浏览器，从而实现多浏览器的覆盖测试，去[ Selenium downloads page](http://selenium-release.storage.googleapis.com/index.html)下载最新版的 `selenium-server-standalone-{VERSION}.jar`

    $ java -jar selenium-server-standalone-{VERSION}.jar
    // sudo java -jar bin/selenium-server-standalone-3.4.0.jar

启动成功
    
    Selenium Server is up and running

[Chrome 驱动](https://sites.google.com/a/chromium.org/chromedriver/downloads)

    node test/start.js -t test/baidu.js -e chrome --verbose
    
    nightwatch test/baidu.js -e chrome --verbose

[官网](http://nightwatchjs.org/)

---------- 备忘 ----------

nightwatch 示例

module.exports = {
  '测试样例，访问baidu.com' : function (client) {
    client
      .url('http://www.baidu.com')
      .waitForElementVisible('body', 1000)
      .elements('css selector', '#index-container ul.features li', function (result) {

        for (var i = 0; i < result.value.length; i++) {
          var element = result.value[i];

          var selector = '#index-container ul.features li:nth-child(' + (element.ELEMENT ) +') em';
          client.verify.cssClassPresent(selector, 'glyphicon');
        }
      });
      //.end();
  }
};

module.exports = {
    'Blog test': function (client) {
        client
            .url('https://longze.github.io/#!/')
            .assert.containsText('.main-title', '龙则的个人站点')
            .end();
    }
};

Error retrieving a new session from the selenium server 这个问题怎么都调不过去，先放放吧。

编写用例的方式：

API 测试方面，的人工编写测试代码效率和效果都很好。

Dom 测试方面，人工编写测试代码效率较高，但是测试面

## 参考

[如何进行前端自动化测试？](https://www.zhihu.com/question/29922082)

[前端可视化的测试实践](https://zhuanlan.zhihu.com/p/21263120)

[karma+webpack搭建vue单元测试环境](http://www.jianshu.com/p/a515fbbdd1b2)

[测试框架](https://www.awesomes.cn/repos/Applications/Testings)

[ava](http://www.tuicool.com/articles/UJ3MNbf)

[selenium + nightwatch 进行前端测试](http://www.jianshu.com/p/a54b2d1045b5)

[GUI软件测试](http://baike.baidu.com/item/GUI%E8%BD%AF%E4%BB%B6%E6%B5%8B%E8%AF%95)

[Testing Javascript: get started with Jasmine](https://inviqa.com/blog/testing-javascript-get-started-jasmine-0)