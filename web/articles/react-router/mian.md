# React Router 6.0 学习笔记

> 本文以 React 新手的视角展开学习，如果你没有用过 6 之前的版本那本文就非常适合你。由于还没有靠谱的中文文档，这篇文章的基调是半翻译半实践的笔记体。

## 官方文档

官方文档首页: https://reactrouter.com/docs/en/v6

官网给了四个选项:
1. New to React Router(新手模式)，第一次使用 React Router，提供全部你需要的知识；
2. Familiar With React Router(熟悉模式)，用过之前的版本，介绍新特性和改变；
3. Wanna dive deep(研究模式)，了解全部概念和术语以及设计思路，想要成为贡献者的必读内容；
4. Frequently Asked Questions，常见问题，你不是第一个遇到这个问题的人；

这篇笔记以新手模式为主线展开。

英文学习:
- concept 概念
- vocabulary 术语
- design principle 设计原理
- Frequently 经常的，频繁的

## 学习指南

文档: https://reactrouter.com/docs/en/v6/getting-started/tutorial

### 介绍

React Router 是一个 React 生态下的可用于客户端与服务端的全功能库，这个 js 库可以帮助你构建多个用户界面，能运行 React 的地方就能运行 React Router，包括 web、用 node.js 写的服务端、React Native。

注意 6.0 的 React Router 需要与 React >= 16.8 搭配使用。

### 安装

`npm install react-router-dom`

### 为 React 注入 Router

```jsx
// main.tsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

注意: 需要在 React 组件的根节点注入 BrowserRouter 组件。

### 添加跳转链接

```jsx
// App.tsx
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Link className="App-link" to="/about">About</Link>
          {' | '}
          <Link className="App-link" to="/inbox">Inbox</Link>
        </p>
      </header>
    </div>
  )
}

export default App
```

到此你可以去点击页面上的链接，你会发现地址变了但是页面没有变化。想要页面有变化我们需要添加一些路由配置。

### 添加路由配置

```jsx
// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

function About() {
  return <h3>About</h3>
}

function Inbox() {
  return <h3>Inbox</h3>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About/>} />
        <Route path="/inbox" element={<Inbox/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
```

可运行示例见 demo/demo-1。

### 嵌套路由

你会发现上面的路由中，首页点击之后就消失了。在实际应用中，共享部分布局是常见的需求，要实现这个需求，React Router 通过嵌套路由来实现。

嵌套路由通过两步来实现:
1. 定义嵌套路由；

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

function About() {
  return <h3>About</h3>
}

function Inbox() {
  return <h3>Inbox</h3>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/about" element={<About/>} />
          <Route path="/inbox" element={<Inbox/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
```

2. 将子路由的组件渲染进 Outlet。
```jsx
// App.jsx
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Link className="App-link" to="/about">About</Link>
          {' | '}
          <Link className="App-link" to="/inbox">Inbox</Link>
        </p>
      </header>
      <Outlet/>
    </div>
  )
}

export default App
```

这一特性可以用来做页面框架布局。

可运行示例见 demo/demo-2。

### 动态路由

```jsx
// routes/invoices.tsx
import { Link } from 'react-router-dom'

function Invoices() {
  let invoices = [
    {
      name: "Santa Monica",
      number: 1995,
      amount: "$10,800",
      due: "12/05/1995",
    },
    {
      name: "Stankonia",
      number: 2000,
      amount: "$8,000",
      due: "10/31/2000",
    }
  ]

  return (
    <div>
      <header>Invoices</header>
      <ul>
        {invoices.map((item) => (
          <li key={ item.number }>
            <Link to={`/invoices/${ item.number }`}>
              { item.name }
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Invoices
```

相对于当前路径的路由可以这样写: `<Link to={`${ item.number }`}>`，运行结果一样。

此时我们还没有定义子路由和相应的页面，点击之后是一个空白页，连 App 组件也没有显示出来。

由此我们可以定义不同路径用不同的布局模板。

### 无匹配路由

当没有路由匹配时，指定一个页面做友好提示


