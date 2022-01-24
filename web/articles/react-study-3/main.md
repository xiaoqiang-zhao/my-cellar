# React -- 第 3 天 -- 实战篇

> 从官网开始一步步学完 React，计划用时 3 天，第 3 天 -- 实战篇。有一个公司的项目要接手，记录一下其中遇到的新东西。

## 代理切换

package.json 中，将 `scripts/start:dev` 下的 “cross-env REACT_APP_ENV=dev MOCK=none UMI_ENV=dev umi dev” 改成 “cross-env REACT_APP_ENV=dev MOCK=local UMI_ENV=dev umi dev” 

这个脚手架的 mock 切换是用命令行变量 MOCK 控制的。

## Mobx

使用了 Mobx 而非 redux。

传统React使用的数据管理库为Redux。Redux要解决的问题是统一数据流，数据流完全可控并可追踪。要实现该目标，便需要进行相关的约束。Redux由此引出了dispatch action reducer等概念，对state的概念进行强约束。然而对于一些项目来说，太过强，便失去了灵活性。Mobx便是来填补此空缺的。

参考: https://blog.csdn.net/weixin_44369568/article/details/90713881

### 用法

参考：https://www.jianshu.com/p/505d9d9fe36a

## router

发现 router 可以设置布局，比 Vue 要棒。

src/router

```ts
// interface 接口
import type { IRoutes } from '@/models/IRoute';
const Routes: IRoutes[] = [
  {
    path: '/exception',
    isMenu: false,
    title: '异常页面',
    component: '@/layouts/BlankLayout',
    routes: [
      {
        path: '/exception/404',
        name: 'not-find',
        component: '@/pages/exception/404',
      },
    ],
  },
  {
    component: '@/layouts/MainLayout',
    routes: [
      {
        component: '@/layouts/BasicLayout',
        wrappers: ['@/pages/authorized'],
        routes: [
          // 数据统计
          {
            path: '/statistics',
            title: '数据统计',
            isMenu: true,
            routes: [
              {
                path: '/statistics',
                title: '数据统计',
                component: '@/pages/statistics'
              }
            ]
          }
        ]
      }
    ]
  }
];
```

还可以设置 wrappers 作为进入页面之前的处理器。

中文文档: http://react-guide.github.io/react-router-cn/docs/API.html

关于 router 的几点猜想:
- route 决定 layout
- 嵌套结构中，如果外层没有对应的页面，可以设置相对路径
```ts
{
    path: '/statistics',
    title: '数据统计',
    isMenu: false,
    routes: [
        {
            path: './overview',
            title: '数据概览',
            component: '@/pages/statistics',
        },
        {
            path: './organization',
            title: '机构统计',
            component: '@/pages/statistics/organization',
        }
    ]
}
```
- 嵌套结构中，如果外层有对应的页面，可以设置相对路径后子路径匹配失败
```ts

```

有几点不懂:
- 路由的配置到底给哪里用了，是直接给 react-router 还是 umi？

## layout

src/layput

业务页面用的 BasicLayout 布局。

```ts
import React from 'react';
import Layout from 'antd/es/layout';
import type { IRouteProps } from '@umijs/types';
import Header from './components/Header';
import Menu from './components/Menu';
import styles from './BasicLayout.less';

const { Content } = Layout;

const BasicLayout: React.FC<IRouteProps> = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Menu {...props} />
      <Layout className="site-layout" style={{ backgroundColor: '#fff' }}>
        <Header {...props} left={false} right={true} className="site-layout-background" />
        <Content style={{ backgroundColor: '#fff' }} className={styles.overContent}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
```

## Menu & Header & Content

左侧导航 Menu 与 顶部用户信息 Header 在 布局中集成，Content 是路由配置的组件。

## React.FC

React.FC<>的在typescript使用的一个泛型，FC 就是 FunctionComponent 的缩写，是函数组件，在这个泛型里面可以使用useState。

参考: https://www.jianshu.com/p/4031ab7376c6

## 函数组件

发现个神奇的地方，函数组件在每次切换路由的时候函数部分都会执行，和我理解的有些不一样。

```ts
const MenuComponents: React.FC<IRouteProps> = ({ location, route: { routes } }) => {
    console.log('每次都会执行');
    return <div> </div>;
};
```

看了一下 Dom 节点也没有重复渲染。没明白是什么原理 ？？

## useEffect

任何一个组件，可以用类来写，也可以用钩子来写。

下面是类的写法。

```ts
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

再来看钩子的写法，也就是函数。

```ts
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

React 的函数组件只应该做一件事情：返回组件的 HTML 代码，而没有其他的功能。

你可能会产生一个疑问：如果纯函数只能进行数据计算，那些涉及计算的操作（比如生成日志、储存数据、改变应用状态等等）应该写在哪里呢？

### 钩子（hook）的作用

React 为许多常见的操作（副效应），都提供了专用的钩子。

- useState()：保存状态
- useContext()：保存上下文
- useRef()：保存引用

上面这些钩子，都是引入某种特定的副效应，而 `useEffect()` 是通用的副效应钩子。找不到对应的钩子时，就可以用它。

### useEffect() 的用法

```ts
import React, { useEffect } from 'react';

function Welcome(props) {
  useEffect(() => {
    document.title = '加载完成';
  });
  return <h1>Hello, {props.name}</h1>;
}
```

第二个参数用来监听依赖。

```ts
function Welcome(props) {
  useEffect(() => {
    document.title = `Hello, ${props.name}`;
  }, [props.name]);
  return <h1>Hello, {props.name}</h1>;
}
```

### useEffect() 的用途

- 获取数据（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）

### useEffect() 的返回值

副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。`useEffect()` 允许返回一个函数，在组件卸载时，执行该函数，清理副效应。

```ts
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

### 尾

在一定程度上回答了上面的问题。那些不变的逻辑应该写进 useEffect。

### useState 的合并特性

```ts
import "./styles.css";
import React, { useEffect, useState } from 'react';

interface ChildComponentProps {
  a: string;
  b: string;
}
const ChildComponent: React.FC<ChildComponentProps> = ({a, b}) => {
  useEffect(() => {
    console.log('change:', a, b);
  }, [a, b]);
  return <div>{a} {b}</div>
}

export default function App() {
  const [a, setA] = useState('a');
  const [b, setB] = useState('b');

  function change() {
    setA('aa');
    setB('bb');
  }

  return (
    <div className="App">
      <ChildComponent a={a} b={b}></ChildComponent>
      <button onClick={change}>点它</button>
    </div>
  );
}
```

使用 hooks 基本可以把组件生命周期简化了，就是：渲染+副作用。

state 改变触发 rerender 调用 render 函数，然后执行到 useEffect，检查依赖，依赖变了调用回调。

线上demo:
https://codesandbox.io/s/elated-sunset-ru2e5?file=/src/App.js

## 样式

### 全局样式

```less
.custom {
 :global(.cus) {
    color: red;
  }
}
```

这个在 Vue 中没有，是个亮点。Vue 中用 scope 对 css 做作用域隔离，想覆盖组件样式需要多加一个没有 scope 的 style。

渲染到页面中的效果是这样的:

```css
.custom___生成的id .cus {
  color: red;
}
```

当 .cus 中海油样式时，依然是带“生成id”的样式:

```less
.custom {
 :global(.cus) {
    color: red;
    .aaa {}
  }
}
// 最后结果:
.custom___生成的id .cus {
  color: red;
}
.custom___生成的id .cus .aaa___生成的id2{}
```

如果想定义多个全局样式，可以向下面这样。

```less
:global {
  .aaa {
    padding: 0;
  }
  .bbb {
    margin: 0;
  }
}
```

## Form

### Drawer 中 Form 报错

错误信息: Instance created by useForm is not connect to any Form element. Forget to pass form prop?

解决方案: 给抽屉组件配置 getContainer={false} 属性。

参考:
https://github.com/ant-design/ant-design/issues/21543

### 嵌套数据的编辑

如果数据是这种嵌套的: `{ a: { b: 1}, d:'d'}`，需要这么 `name={['policyInfo', 'display']}` 写 `name` 属性。

```jsx
<Form>
  <Form.Item name={['a', 'b']} label="b:">
    <Input/>
  </Form.Item>
</Form>
```

如果数据是这样的 `{ a: { b: 1, c: 2}, d:'d'}`，并且要在一行编辑 b 和 c，可以这么写:

```jsx
<Form>
  <Form.Item label="a">
    <Form.Item name={['a', 'b']} noStyle>
      <Input/>
    </Form.Item>
    <Form.Item name={['a', 'c']} noStyle>
      <Input/>
    </Form.Item>
  <Form.Item>
</Form>

如果有更复杂的嵌套逻辑，可以封装成一个组件。

参考: https://ant.design/components/form-cn/#components-form-demo-customized-form-controls

### style

antd 中的 Drawer 组件可以设置 bodyStyle 属性，数据类型为 CSSProperties。

```jsx
<Drawer
  title=""
  placement="right"
  closable={true}
  onClose={closeDrawer}
  visible={drawerVisible}
  bodyStyle={{ padding: 0}}
>
  Text
</Drawer>
```

### Switch 在 Form.Item 中回写无效

在 Form.Item 中直接像用 Input 组件一样使用 Switch，发现数据回写不了。

解决方案其实也挺简单，设置 `valuePropName="checked"` 就可以了。

```jsx
<Form.Item label="数据回流" name="dataCollect" valuePropName="checked">
  <Switch />
</Form.Item>
```

进一步的思考: 为什么不直接像 Input 一样直接可用？

首先在技术上是完全可行的，只需要把属性 checked 改为 value 就行了。但是从 Switch 设计的角度上看，是否选中的属性名定为 checked 明显优于 value。同理于 Checkbox 组件。

关于 valuePropName 的三点注意:

1. 你不再需要也不应该用 onChange 来做数据收集同步（你可以使用 Form 的 onValuesChange），但还是可以继续监听 onChange 事件。
2. 你不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 或 setFieldsValue 来设置。注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。
3. 你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值。

## router

React 中路由传参及接收参数的方式(最新 react-router-dom^4.2.2 的写法)

方式一：通过 params
1. 路由表中      
  <Route path=' /user/:id ' component={User}></Route>
　　　　　　　　　　　
2. Link 处 HTMLn方式
  <Link to={ ' /user/ ' + ' 2 ' }  activeClassName='active'>XXXX</Link>          　　　　
　　　　　　　　　　　
JS 方式
  this.props.history.push(  '/user/'+'2'  )
　　　　　　　　　　　
3. user页面       
  通过  this.props.params.id 就可以接受到传递过来的参数（id）
　　　　　　　　　　　
方式 二：通过 query

前提：必须由其他页面跳过来，参数才会被传递过来
注：不需要配置路由表。路由表中的内容照常：<Route path='/user' component={User}></Route>

1.Link 处 HTML 方式
  <Link to={{ pathname: ' / user' , query : { day: 'Friday' }}}>
　　　　　　　　　　
JS方式
  this.props. history.push({ pathname : '/ user' ,query : { day: 'Friday'} })

2. user页面     
  this.props.location.query.day
                          
方式 三：通过state

同query差不多，只是属性不一样，而且state传的参数是加密的，query传的参数是公开的，在地址栏

1.Link 处 HTML 方式：
  <Link to={{ pathname : ' /user' , state : { day: 'Friday' }}}> 
                          　　
  JS方式：
  this.props.history.push({ pathname:'/user',state:{ day : 'Friday' } })
                      　　   
2. user页面       
    this.props.location.state.day

参考: https://blog.csdn.net/qq_24504591/article/details/78973633

```ts

```

```ts

```

```ts

```

```ts

```

参考: https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html

一个来自知乎的问题:

react中onClick={fun}和onClick=>{()=>fun}有何区别呢？

链接: https://www.zhihu.com/question/504049336/answer/2259867700

```ts
function onClick(callbackFunction) {
  callbackFunction();
}

function fun() {
  console.log('oye');
}

// onClick={fun} 相当于
onClick(fun);

// onClick=>{()=>fun} 相当于
onClick(() => {
  fun();
});

// 其实就是包了一层，本质上没区别
// 如果硬要说要区别，可能在扩展性上，后者可以做数据装换，例如像这样
onClick((event, id) => {
  fun({event, id});
});
```
