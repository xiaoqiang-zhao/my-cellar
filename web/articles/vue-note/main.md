# vue2.0 使用笔记

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

每个接口的通用状态，就是每个接口都有可能出现的状态。为了和 http 区分，可以用四位数字来表达，结合自己的项目经验给几个最常用的，基本也够用了:
- 2000 正常请求
- 4000 参数错误
- 4001 未登录
- 4002 已登录无权限
- 4004 请求地址未定义
- 5004 服务器错误

## axios

刚做完上面的分享，发现 vue-resource 被官网弃坑了，真是感慨前端的技术迭代速度真是快。

具体为什么弃坑请查阅这篇文章：[Retiring vue-resource](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4)。我简单翻译了给出的 3 条理由：

- 与 Vue 核心功能没有太大关系；
- 有第三方库可以完成同样的功能，而且社区更活跃，我们是在做重复工作；
- 我们可以把用在 vue-resource 上的时间花在更有意义的事情上。

axios 也有 interceptors，只是将请求前和完成后分成了 request 和 response，用法大同小异：

```js
axios.interceptors.request.use(config => {
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

在 request 中可以全局添加一些参数。注意 data 是两种不同类型的数据，需要用不同的方法添加。
```js
axios.interceptors.request.use(config => {
    config.url = '/api' + config.url;
    const currentUser = utiles.getCurrentUser();
    if (currentUser) {
        config.data = config.data || {};
        if (config.data instanceof FormData) {
            config.data.append('bName', currentUser.bCompanyName);
        }
        else {
            config.data.bName = currentUser.bCompanyName;
        }
    }

    return config;
});
```

## vue-router 登录控制

后台系统中大多数页面都是登录后才能访问的，这里做了全局的拦截，只有登录后才能访问。

```js
router.beforeEach(function (to, from, next) {
    // // 未找到匹配页面
    const isLogined = utiles.getCurrentUser() !== null;
    const noLoginedPagesPath = [
        '/login',
        '/register',
        '/reset-pwd'
    ];
    // 登录状态下默认到 “患者建档页”
    if (isLogined) {
        if (to.path === '/' || noLoginedPagesPath.indexOf(to.path) !== -1) {
            next({
                replace: true,
                // 登录后默认首页
                path: '/create-patient-record'
            });
        }
    }
    // 非登陆状态下，noLoginedPagesPath 以外的一面只能到登陆页
    else if (noLoginedPagesPath.indexOf(to.path) === -1) {
        next({
            path: '/login'
        });
    }
    else {
        next();
    }
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
});
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

## vuex 状态控制

### vuex 要解决的问题

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

### 快速上手

每个应用仅仅包含一个 store 实例，Vuex 提供了一种机制将状态从根组件『注入』到每一个子组件中。所以我们只要在根组件写入 store，其他组件就都可以访问 store 了，看实例代码：

根组件 /src/main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
```

子组件 /src/vuex/get-started.vue

```html
<template>
    <div>
    count:{{count}}
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    computed: {
        count () {
            return this.$store.state.count
        }
    },
    methods: {}
}
</script>
```

### 核心概念

state，对外只读。

getters，是 store 的计算属性，组装器类，似 vue 中的计算属性 computed。

mutations，用于同步修改 state，供对外 `commit`，示例：
```js
// store 中定义
actions: {
    functionA (state, payload) {
        state.count += payload.amount
    }
}

// 组件中触发
this.$store.commit('functionA', {
    amount: 10
})
```

actions，异步事件和提交 mutations。
```js
// store 中定义
actions: {
    functionB (context, payload) {
        context.state.count += payload.amount
        // 在异步函数中可以触发同步函数
        context.commit('functionA', state.count);
    }
}

// 组件中触发
this.$store.dispatch('functionB', {
    amount: 10
})
```

modules，当应用变得非常复杂时，store 对象就有可能变得相当臃肿，用 modules 分割 store。每个 module 里又可以有 state、getters、mutations、actions、modules 一套完整的 store。

```js
const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 技巧

与计算属性 computed 搭配使用，直接放在 data 中不会主动同步。

如果 store 中的数据是对象或数组，那么修改对象的属性和修改数组的元素是不会被 computed 监听到的。解决办法:
1. 先深拷贝，修改后直接一个对象或数组覆盖上去，适合数据逻辑比较简单的场景;
2. 使用生成器，适合逻辑比较复杂的场景；
3. 监听关键变量，手动去更新变化部分，适合数据量比较大的场景。

```js
// 这是我 super-note 开源项目中的一段代码
export default {
  computed: {
    // 缩放比例, 一年:像素高度, 默认是 1，可在 1 和 10 之间切换
    scale() {
      return this.$store.state.scale
    }
  },
  mounted() {
    this.update()
  },
  watch: {
    scale() {
      this.update()
    }
  },
  methods: {

    /**
     * 初始化，占位函数，会被实例化组件的方法替代
     */
    init() {},

    update() {
      this.init && this.init()
      if (this.data) {
        this.positionStyle = this.data.positionData.positionStyle
      }
    }
  }
}
```

## 场景描述

官网提供的解决方案有一种多年前 `window.data` 的味道，只是做了一些限制，限定了数据更改的方式，通过在 `mutations` 函数中打断点方便追踪数据的改变。

首先在单页应用中，两个页面之间有数据通信的设计是否合理？

如果两个页面之间只有一两个参数的单项通信是合理的，比如列表页到详情页需要一个 id 参数。如果在两个页面之间进行通信的数据 是 较多数据字段 或者 有数组和对象(特别是多层对象)，我认为这样的设定把两个页面耦合的太紧了。做这样的判断主要有两点依据：

- 单页应用的每个页面都是可以刷新的，那么如果没有前面的页面当前页面也是可以独立运行的；
- 如果两个页面共同依赖一份数据，那么两个页面应该依赖一个独立模块而不应该相互依赖(这一点比较像 require.js 解决循环依赖的思路)。

如果两个页面之间的通信，也就是页面级组件的通信没必要存在的话，那么还有必要将多个页面的通信数据都在同一个 store 中定义吗？我觉得定义在一个 store 有两个弊端：

- 一个页面的逻辑被写在了两处；
- 内存中存在一些当前页面用不到的数据。

写在一起也有一个优势：只需要有一个 Vuex 实例。

对于内存的消耗场景不同对比结果不同，前者是每一个页面都实例化一个 store，但是不加载其他页面的数据，这种方式每个页面的消耗直接取决于当前页面共享数据的复杂程度，如果页面的共享数据复杂程度差不多那么消耗也都差不多；后者第一个页面的消耗等于前者全部页面消耗的总和减去 n - 1 个 store 实例化的消耗(n 为页面数)。前者有利于提升首屏加载速度，后者有利于提升整体的平均速度(在大部分页面都被使用的时候)。

全站一个 store 的使用是官网推荐的，示例也比较全这里不展开。每个页面一个 store 的使用也是可以容易实施的，下面给出关键部分的代码：

```js
    // 首先在全局向 Vue 注册插件 Vuex
    Vue.use(Vuex)
    
    // 然后在向页面的顶层组件中注入 store
    import Vuex from 'vuex'
    const store = new Vuex.Store({
      // ... 略
    })
    export default {
      store,
      // ... 略
    }
```
## 隐秘特性

### watch

watch 的属性触发先后顺序是什么？哪个属性先赋值就先触发吗，并不是！

哪个属性在 watch 中先定义，先触发。

这个设定好诡异，watch 是对象，其属性应该是无顺序的，感觉是设计上的瑕疵。

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

v-model 的通用开发技巧:

```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
});
<base-checkbox v-model="lovingVue"></base-checkbox>
```

### 在 js 中怎么使用 this.$http

有的时候我们会用一个独立的 js 处理复杂数据，以减少 vue 文件中的代码数量。在请求服务端数据时，在 vue 文件中我们可以直接使用 `this.$http` 来获取数据，但是到了独立 js 中没有了 vue 对象怎么办？

可以直接引入 axios，命令: `import axios from 'axios'`，如果你明白 require 与 ES6 Modules 的区别，很容易想到这里的 axios 与 this.$http 是一样的，在 main.js 中的全部配置都生效。

代码:
```js
import axios from 'axios'

axios.get('/api/xxx').then(res => {
    
});
```

### 定制组件样式

覆盖引入组件内部 Dom 节点样式由两种方式：

 - 1、写单独的样式文件，然后引入；
 - 2、单独添加一个不带 scoped 属性的 style 标签。

### dll 优化

webpack.dll.conf.js

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vue: ['vue', 'vue-router'],
        ui: ['element-ui']
    },
    output: {
        path: path.join(__dirname, '../src/dll/'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            // 打包dll存放的位置，之所以不放在dist下，是因为第三方库不需要每次都打包
            path: path.join(__dirname, '../src/dll/', '[name]-manifest.json'),
            name: '[name]'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
```

webpack.prod.conf.js

```js
const webpackConfig = merge(baseWebpackConfig, {
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require('../src/dll/ui-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            manifest: require('../src/dll/vue-manifest.json')
        }),
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new AutoDllPlugin({
            inject: true,
            debug: true,
            filename: '[name]_[hash].js',
            path: './dll',
            entry: {
                vendor: [
                    'vue',
                    'vue-router',
                    'ui'
                ]
            }
        })
    ]
});
```

注意 webpack.dll.conf.js 中 entry 与 webpack.prod.conf.js 中 vendor 的统一性。

## element-ui 部分

### upload 组件开发备忘

upload 是单文件传送的

before-upload 事件中修改 data 无效，要想修改 data 用下面的自定义上传方法 http-request

file-list 参数组件并不会自动更新数据，需要在事件中手动维护，推荐在 on-change 中直接赋值更新，也可以通过 ref 拿到组件的 uploadFiles 就是 file-list。

http-request 函数可以自定义上传逻辑

官网没有示例代码，这里补充一个:

```html
<el-upload
    class="upload-demo"
    ref="invoiceUploadComponent"
    action="/api/upload/invoice"
    :http-request="uploadFile"
    :file-list="invoiceFileList"
    :data="{key: 'invoice'}"
    multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">
        <div>提示: XXX</div>
    </div>
</el-upload>
```
```js
uploadFile(fileData) {
    const formData = new FormData();
    // 键值
    formData.append('file', fileData.file);
    formData.append('uid', fileData.file.uid);

    this.$http.post(
        fileData.action,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(res => {
        debugger
    }).catch(err => {
        console.error(err);
    });
},
```

参考网站: https://www.jianshu.com/p/0a0d2ba76c3c

如果你想自定义上传失败，可以通过上面的自定义提交事件来控制。

```js
uploadFile(fileData) {
    const formData = new FormData();
    // 键值
    formData.append('file', fileData.file);
    formData.append('uid', fileData.file.uid);

    this.$http.post(
        fileData.action,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(res => {
        // 从列表中删除上传失败的文件
        const uploadFiles = this.$refs.theComponentName.uploadFiles;
        const index = uploadFiles.findIndex(item => item.uid === fileData.uid);
        uploadFiles.splice(index, 1);
    }).catch(err => {
        console.error(err);
    });
},
```

此方法会造成页面抖动，暂时还没有很好的办法解决。

思考: 这应该是 API 设计的问题，有这样几个问题:
1. file-list 只能用来做数据初始化，上传成功个删除不自动更新；
2. on-change、on-error、on-success、http-request 这些明显是方法，为什么要定义为 prop；
3. 在执行顺序上，设置了自定义上传方法 http-request，依然会先调用 on-change 等方法，并且更新数据和 dom。

如果由我来设计，我的初步方案是:
1. file-list 采用 v-model，要双向绑定自动更新；
2. 将 on-change 等定义为方法；
3. 如果定义了 http-request，还需要一个参数定义是否手动触发 on-change、on-error、on-success 这些方法；
4. 如果不手动触发，通过返回 promise 对象来决定触发哪一个。

参考网站: https://blog.csdn.net/Missying55/article/details/115008761

### el-input 原生事件

element-ui 的 input 组件可以用 @keyup.enter.native="login" 来监听回车事件

### el-table

表格列宽技巧: 用 min-width 代替 width，在宽屏时间距会比较均匀。

不足之处，如果表格能先按最小宽度分配，剩下的部分宽度再均分就更好了，这样列之间的间距会更均匀。

操纵表格的排序:
```js
this.$refs.table.clearSort();
const prop = 'theKey';
const order = 'descending'; // or ascending
this.$refs.table.sort(prop, order);
```

### 浏览器的自动填入功能禁用

在普通的 input 上直接 off 就行了
```html
<input type="password" autoComplete="off"/>
```

elementui 上使用 autoComplete="off" 是无效的，用 autoComplete="new-password" 才可以
```html
<el-input v-model="password" auto-complete="new-password"></el-input>
```

### 服务启动中

在边缘计算环境下(客户那边放一个树莓派的小盒子)，环境启动可能比较慢，加一个 loading 状态。

```js
export default {
    created() {
        const serviceCode = localStorage.getItem('serviceCode');
        if (serviceCode !== '1') {
            this.loading = this.$loading({
                lock: true,
                text: '服务启动中，启动成功后将自动刷新页面……',
                spinner: 'el-icon-loading',
                customClass: 'login-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }

        this.rotation();
    },
    destroyed() {
        if (this.setTimeoutId) {
            window.clearTimeout(this.setTimeoutId);
        }
    },
    methods: {

        /**
         * 轮训服务器启动状态
         */
        rotation() {
            this.$http.get('/service').then(res => {
                // service status codes:
                // status undefined: 0
                // all services running: 1
                // scheduler failed: 2
                const code = res.data.code;
                if (code === 1 && this.loading) {
                    this.loading.close();
                    this.loading = null;
                }
                if (localStorage.getItem('serviceCode') !== (code + '')) {
                    window.location.reload();
                }

                localStorage.setItem('serviceCode', code);
            }).finally(() => {
                this.setTimeoutId = setTimeout(() => {
                    this.rotation();
                }, 2000);
            });
        }
    }
};
```

通过 `localStorage` 来存储前一个状态。

轮训会一直跑，如果当前轮训到的状态与上一次在 `localStorage` 中存储的状态不同时就刷新页面，这样可以从启动中切换到启动成功，如果遭遇到突然关机，可以已从成功状态切换到 loading 状态。

## 组建间数据通信

vuex不是万能药，组建之间的数据通信很多情况是不适用的，这里总结一下组件通信的常用方法的适用场景。

## 生命周期

基本是这样的:

- beforeCreate，事件初始化和生命周期开始
- created，注入和反射
- beforeMount，生成 html 后
- mounted，将生成的 html 插入到页面中
- beforeUpdate，数据改变
- updated，更新虚拟 dom 和实体 dom
- beforeDestroy，销毁前
- destroyed，销毁完成

记忆方式: create -> mounte -> destroye

## 面试题

### 计算属性 vs 监听属性

computed 与 watch，异同点，举例业务场景。

广播模式 和 观察者模式

### 计算属性 vs 方法

计算属性的缓存特性，方法的每次都调用特性。

### 计算属性的 setter

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

### 条件渲染

为什么不推荐 v-for 与 v-if 在同一个节点上使用？

使用了会怎样？v-for 的优先级高于 v-if。

怎么避免 v-for 与 v-if 同时使用？外放 v-if，对 v-for 使用计算属性。

### keep-alive

keep-alive 有什么用？

缓存组件数据和状态，多用在 router 中。

- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- max - 数字。最多可以缓存多少组件实例。
