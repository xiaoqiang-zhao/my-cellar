# vue2.0 使用技巧 

> 使用 vue 已经有一段时间了,vue2.0已经进入 rc 版,这里终结并验证一些从 vue1.x 中延续而来的一些经验,同时备忘一些新特性和老版迁移方案。

## 循环组件

### 要解决的问题

如果你在写一个高度定制化的组件或页面,那么组件是否出现需要由配置数据决定。

### 关键特性

`:is` 通过这个特性来配置组件类型。

需要在子组件列表中将可能出现的全部组件列出来。

    components: {
        'component-a': ComponentA,
        'component-b': ComponentB
    }    

### 解决方案示例

模板写法:

    <div id="app">
        <component v-for="(item,index) in items" :is="item.type" :index="index"></component>
    </div>

Js 写法:

    var app = new Vue({
        el: '#app',
        components: {
            'component-a': ComponentA,
            'component-b': ComponentB
        },
        data: {
            items: [
                {
                    type: 'component-a'
                },
                {
                    type: 'component-b'
                },
                {
                    type: 'component-a'
                }
            ]
        }
    });

两个子组件:
    
    var ComponentA = Vue.extend({
        props: ["index"],
        data: function () {
            var index = this.index;
            if (index !== undefined) {
                index = index + '- ';
            }

            return {
                index2: index
            };
        },
        template: '<div>{{index2}}ComponentA的实例</div>'
    });
    var ComponentB = Vue.extend({
        template: '<div>ComponentB的实例</div>'
    });

需呀注意的是父子组件数据传递时需要通过`props`特性,在子组件中建议直接使用父组件传过来的数据,同名覆盖是不推荐的,最后给个 [Demo 链接](/articles/vue-note/demo/for-components.html),方便查看源码。

## 组件中数组的 watch

[Event](articles/vue-note/demo/event.html)

[子组件索引，组件循环](articles/vue-note/demo/v-ref.html)

[参考](http://vuejs.org.cn/guide/components.html#子组件索引)