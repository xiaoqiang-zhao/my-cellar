# vue2.0 通用代码片段

> 有一些全局起作用的代码，你的项目中也可能用得到。

## 全局的 Ajax 错误拦截

在业务代码中每个异步请求都需要有一个处理请求失败的回调函数，向下面这样：

```js
this.$http.get(url).then((res) => {
    // 成功的逻辑
}, (res) => {
    // 失败的逻辑
});
```

对于失败的逻辑，代码几乎都一致 -- 弹个框提示数据请求失败，这样的代码写多了就像能不能不每次写，研究了一下还真有，而且实现并不麻烦，先把代码扔出来：

```js
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.interceptors.push((request, next) => {
    // 异步成功后最开始执行下面方法
    next(response => {
        if (response.body !== null) {
            // 业务代码可能需要 后台返回的 status 和 statusInfo，这里添加一个字段
            response.json = response.body;
            // 为了数据使用方便，提升一级 data
            response.body = response.body.data;

            // 这里补一个系统级别的 逻辑错误指定
            if (response.json.status !== 0) {
                response.ok = false;
            }
        }

        // 弹出全局错误提示
        if (response.ok === false) {
            let message;
            let title = '系统异常';
            if (response.status !== 200) {
                message = '接口异常，异常状态码:' + response.status;
            }
            else if (response.json && response.json.statusInfo) {
                message = response.json.statusInfo;
                if (response.json.status === 500) {
                    title = '提示';
                }
                // 这里还可以和服务器端约定一些系统级的 status 码
                // 如登录超时，无权限，系统繁忙稍后重试等，并进行统一处理
            }

            // messageBox 是封装的一个消息弹框
            messageBox({
                title: title,
                type: 'error',
                message: message
            });
        }

        return response;
    });
});
```

VueResource 提供了 interceptors 接口，我们可以注入自己的逻辑，回调函数会在请求前被执行，请求完成后会执行 next 函数。值得注意的是这个系统级别的拦截，业务代码无法控制其中的逻辑，除非你在里面加一下特殊的业务逻辑判断，但我认为那是比较糟糕的实现。

## axios

刚做完上面的分享，发现 vue-resource 被官网弃坑了，真是感慨前端的技术迭代速度真是快。

具体为什么弃坑请查阅这篇文章：[Retiring vue-resource](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4)。我简单翻译了给出的 3 条理由：

- 与 Vue 核心功能没有太大关系；
- 有第三方库可以完成同样的功能，而且社区更活跃，我们是在做重复工作；
- 我们可以把用在 vue-resource 上的时间花在更有意义的事情上。

axios 也有 interceptors，只是将请求前和完成后分成了 request 和 response，用法大同小异：

```js
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
```
## 404 页面

如果地址做了修改没有匹配到相应的页面模块，默认会出空白页面，这时我们需要有一个像传统多页面网站那样的 404 页面，可以添加这么一段检测路由匹配的代码：

```js
router.beforeEach(function (to, from, next) {
    // 未找到匹配页面
    if (to.matched.length === 0) {
        next({
            path: '/page-404',
            query: {
                fromPath: to.path
            }
        });
    }
}
```
404 页面和普通的页面没有什么区别，这里简单示意一下：

```js
<template>
    <div class="page-404">
        未找到匹配的页面模块:{{fromPath}}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                fromPath: this.$route.query.fromPath
            }
        }
    }
</script>
```

## 技巧

### 组件的原生技能

样式类(class)不需要编码实现，只要引用时添加就会出现在组件最外层的标签上，同时还会引入运行时环境的 scope 到组件最外层的标签上。

简单两个属性实现 v-model：

```html
<div class="input-x">
    <input 
        type="text"
        v-bind:value="value"
        @input="$emit('input', $event.target.value)">
</div>
```

### 定制组件样式

覆盖引入组件内部Dom节点样式由两种方式：

 - 1、写单独的样式文件，然后引入；
 - 2、单独添加一个不带 scoped 属性的 style 标签。

