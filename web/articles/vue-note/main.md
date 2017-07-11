# vue2.0 通用代码片段

> 有一些全局起作用的代码，你的项目中也可能用得到。

## 全局的 Ajax 错误拦截

在业务代码中每个异步请求都需要有一个处理请求失败的回调函数，向下面这样：

    this.$http.get(url).then((res) => {
        // 成功的逻辑
    }, (res) => {
        // 失败的逻辑
    });

对于失败的逻辑，代码几乎都一致 -- 弹个框提示数据请求失败，这样的代码写多了就像能不能不每次写，研究了一下还真有，而且实现并不麻烦，先把代码扔出来：

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

VueResource 提供了 interceptors 接口，我们可以注入自己的逻辑，回调函数会在请求前被执行，请求完成后会执行 next 函数。值得注意的是这个系统级别的拦截，业务代码无法控制其中的逻辑，除非你在里面加一下特殊的业务逻辑判断，但我认为那是比较糟糕的实现。

## 404 页面




