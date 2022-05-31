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

可运行示例见 demo/demo-3。

### 无匹配路由

当没有路由匹配时，指定一个页面做友好提示页:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="/invoices" element={<Invoices/>} />
      <Route
        path="*"
        element={
          <section style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </section>
        }
      />
    </Route>
  </Routes>
</BrowserRouter>
```

可运行示例见 demo/demo-4。

### 参数读取

动态路由的参数可以通过 useParams 方法获取。

对于问号后的 query 参数，在下面的 Search Params 中详细讲解。

```jsx
// main.tsx
<Route path="/invoices/:number" element={<InvoicesDetail/>} />
```

```jsx
// InvoicesDetail.tsx
import { useParams } from "react-router-dom";

function InvoiceDetail() {

  let params = useParams();

  return (
    <div>
      <header>Invoice Detail</header>
      <article>
        参数: {`number: ${params.number}`}
      </article>
    </div>
  )
}
```

可运行示例见 demo/demo-5。

### Index Routes

相较于之前的 react route 版本，6.0 的 Index Routes 是一个比较大的改变。

从上面的示例中可以看到，当访问根路径 `/` 时，匹配到了 App 组件，其他组件渲染为空。

子路由设置 `index` 属性，就可以将此子路由设为 Index Route。

```jsx
// main.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="/invoices" element={<Invoices/>}>
      {/* 设置 Index Route */}
      <Route
        index
        element={
          <main style={{ padding: "1rem" }}>
            <p>Select an invoice</p>
          </main>
        }
      />
        {/* 当不以 "/" 开头时，可以继承上面的路径，推荐这种写法，方便修改 */}
        <Route path=":number" element={<InvoicesDetail/>} />
      </Route>
      
      <Route
        path="*"
        element={
          <section style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </section>
        }
      />
    </Route>
  </Routes>
</BrowserRouter>
```

什么是 Index Route？官方给了 4 点:
1. 作为子路由组件，在匹配到父路由时，渲染在父路由的 outlet 占位处；
2. 如果没有匹配到子路由，Index Route 连同其对应的父路由都不会被渲染(这里的官网写错了)；
3. Index Route 为默认路由；
4. Index Route 一般被用在列表还未点击任何一项的时候。

总结: 每一个嵌套路由中，都可以有一个 Index，这种设计比前一版更方便。

可运行示例见 demo/demo-5。

### Active Links

本节介绍一个新组件: NavLink。

NavLink 继承自 Link，添加了 5 个属性:
- activeClassName(string)：设置选中样式，默认值为 active
- activeStyle(object)：当元素被选中时，为此元素添加样式
- exact(bool)：为 true 时，只有当导致和完全匹配 class 和 style 才会应用
- strict(bool)：为 true 时，在确定为位置是否与当前 URL 匹配时，将考虑位置 pathname 后的斜线
- isActive(func): 判断链接是否激活的额外逻辑的功能

我们将 demo-1 中的 Link 组件换成 NavLink:

```jsx
// 
import { NavLink, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <NavLink className="App-link" to="/about">About</NavLink>
          {' | '}
          <NavLink className="App-link" to="/inbox">Inbox</NavLink>
        </p>
      </header>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default App
```

匹配到的路由会有一个名为 “active” 的 class，如果你不想叫 active 可以用 activeClassName 属性设置其他名称。

示例在 demo-6 中。

### Search Params

你可能遇到过 `/shoes?brand=nike&sort=asc&sortby=price` 这样的 url，想要读取问号后的参数我们需要另一个组件: useSearchParams。

```jsx
import {
  NavLink,
  Outlet,
  useSearchParams,
} from "react-router-dom"

let [searchParams, setSearchParams] = useSearchParams()
// 获取参数
searchParams.get('sortby')
// 设置参数
setSearchParams({ sort: 'desc' })
```

### Custom Behavior

在一个有过滤条件的列表中，如果你点了另外的链接，那么列表的过滤条件就会被清除掉。这是现在路由大多数的默认行为，包括 React Router。在大多数情况下这是你想要的效果，但也有一些情况是你希望保留过滤参数。

我们写一个组件实现从 `/invoices?a=123` 到 `/invoices/2000?a=123`，也就是从列表页到详情页并且将列表页的参数带到详情页中。

定义组件:
```jsx
// QueryNavLink.tsx
import { useLocation, NavLink } from "react-router-dom";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default QueryNavLink;
```

在列表页中使用组件(代码相对于 Demo 有精简):
```jsx
// invoice
import QueryNavLink from '../hooks/QueryNavLink'
function Invoices() {
  let invoices = [
    {
      name: "Santa Monica",
      number: 1995,
      amount: "$10,800",
      due: "12/05/1995",
    }
  ]

  return (
    <div>
      <header>Invoices</header>
      <ul>
        {invoices.map((item) => (
          <li key={ item.number }>
            <QueryNavLink to={`/invoices/${ item.number }`}>
              { item.name }
            </QueryNavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Invoices
```

location looks 还有更多的选项:
```js
{
  pathname: "/invoices",
  search: "?filter=sa",
  hash: "",
  state: null,
  key: "ae4cz2j"
}
```

示例在 demo-7 中。

### 小结

到此为止，React Router 教程基本已经结束，介绍了:

- Router 怎么 render 进 Roact 的 root 节点;
- 嵌套路由；
- 路由首页与无匹配路由；
- 动态路由与参数的获取；
- NavLink与自定义路由行为。但是可以看出教程并没有。

这一趴的教程是比较基础的，选取了一些常用概念串讲了一个使用案例，入门看它基本够了。但是一个案例肯定不能覆盖全部知识点，如果想更好的理解 React 的实现原理或深度使用，我们继续下一趴。

## 主要概念(Main Concepts)

官方原版英文文档:
https://reactrouter.com/docs/en/v6/getting-started/concepts

下面介绍 React Router 的实现原理。

### 定义(definitions)

在前端与后端架构中，同一个词可能有不同的含义。下面介绍的这些词我们会频繁用到，为了消除歧义，做如下约定:

- URL: 在地址栏里面的全部内容；
- Location: 一个 React Router 定制的对象，基于浏览器的 window.location 对象；
- Location State: 一个未经 encoded 编码的值，这对使用 hash 和 search params 很有帮助，存储在浏览器缓存中；
- History Stack: 作为用户导航，浏览器保存每一个 location 在队列中，再点击浏览器的后退按钮，你可以在地址栏看到这个队列中的某个值；
- Client Side Routing (CSR): 一个纯 HTML 文本可以跳转到其他文本，并且变化会添加到浏览器的历史队列表中，SCR 可以使得浏览器不借助服务器刷新页面来实现跳转；
- History: 一个允许 React Router 监听路由改变的对象；
- History Action: pop、push、replace 动作；
- Segment: URL 段，例如 /users/123 有两段；
- Path Pattern: 路径模式，例如: `/users/:userId` 为 dynamic segments，`/docs/*` 为 star segments
- Dynamic Segment: 动态参数路由段；
- URL Params: 动态参数的具体值；
- Router: 使全部组件与hook可运行的顶层组件；
- Router Config: 一个树型结构的 routes 对象，去匹配嵌套路由；
- Route: 一个像 `{ path, element }` 这样的对象，或像 `<Route path element>` 这样的元素，当他被匹配到时才会渲染响应的组件；
- Route Element: `<Route>`;
- Nested Routes: 嵌套路由；
- Relative links: 绝对路由，以 `/` 开头的路由；
- Match: 一个用于存储匹配数据的对象，比如  url params 和 pathname；
- Matches: 一个 route 数组；
- Parent Route: 子路由的父级 -- 父路由；
- Outlet: 下一级路由对应的组件渲染的占位符；
- Index Route: 当没有子路由匹配时的默认路由；
- Layout Route: 布局路由，最外层的特殊布局；

### History

在不使用任何路由的时候，浏览器已经有了自己的路由管理功能，这也是我们点击浏览器的前进和后退能够跳转的原因。

如果我们这样点击:

1. 点击链接到 /dashboard
2. 点击链接到 /accounts
3. 点击链接到 /customers/123
4. 点击回退按钮
5. 点击链接到 /dashboard

浏览器中的历史队列对应是这样的:

1. /dashboard
2. /dashboard, /accounts
3. /dashboard, /accounts, /customers/123
4. /dashboard, /accounts, /customers/123
5. /dashboard, /accounts, /dashboard

### History Object

在客户端路由中，开发者可以操纵路由的跳转:

```jsx
<a
  href="/contact"
  onClick={(event) => {
    // stop the browser from changing the URL and requesting the new document
    event.preventDefault();
    // push an entry into the browser history stack and change the URL
    window.history.pushState({}, undefined, "/contact");
  }}
/>
```

虽然地址变了，但是页面没有任何改变。(注: 这里是在介绍原理，不是 React Router 的使用方法)

我们需要监听路由的改变来实现逻辑:

```jsx
window.addEventListener("popstate", () => {
  // URL changed!
});
```

但是这只监听还不够，我们需要添加浏览器中前进、后退、直接输入的动作:
```jsx
let history = createBrowserHistory();
history.listen(({ location, action }) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
});
```

### Location

浏览器有一个 location 对象，他告诉我们我们 url 中有什么数据，还提供了一些方法:

```js
window.location.pathname; // /getting-started/concepts/
window.location.hash; // #location
window.location.reload(); // force a refresh
```

React Router 丰富了原生的 location:

```js
{
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram",
  hash: "#menu",
  state: null,
  key: "aefz24ie"
}
```

前三个是浏览器 location 自带的，后面两个是 React React 独有的。

对于 pathname，如果是动态路由(dynamic route)，可以借助 useParams 来读取:

```js
// /bbq/:value
import { useParams } from "react-router-dom";
let params = useParams();
`动态路由参数 value: ${params.value}`
```

search 参数:

```js
import { URLSearchParams } from "react-router-dom";
let params = new URLSearchParams(location.search);
params.get("campaign"); // "instagram"
params.get("popular"); // "true"
params.toString();
```

hash 一般用来控制滚动条，获取方法 (todo)。

你可能好奇，为什么是 window.history.pushState() 而不是 window.history.push，state 是什么？不就是改 url 么。好吧，我也不知道，当时设计这个 API 的时候我没参会。但是它是一个很酷的特性。

```js
window.history.pushState("look ma!", undefined, "/contact"); // 第二个参数为 title
window.history.state; // "look ma!"
// user clicks back
window.history.state; // undefined
// user clicks forward
window.history.state; // "look ma!"
```

注: title 当前大多数浏览器都忽略此参数，尽管将来可能会使用它。 在此处传递空字符串应该可以防止将来对方法的更改。 或者，您可以为要移动的状态传递简短的标题。

注: 在 React Router 的应用中你不能直接读 history.state。

跳转路由有两种写法:

```jsx
<Link to="/pins/123" state={{ fromDashboard: true }} />;

let navigate = useNavigate();
navigate("/users/123", { state: partialUser });
```

在下一个页面你可以这样接收到 state:

```js
let location = useLocation();
location.state;
```

注意，state 本质上是字符串，new Date() 这样的字段会被转成字符串。

### 定义路由(Defining Routes)

定义路由有两种形式:
```jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

数组形式:
```js
let routes = [
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "teams",
        element: <Teams />,
        children: [
          {
            index: true,
            element: <LeagueStandings />,
          },
          {
            path: ":teamId",
            element: <Team />,
          },
          {
            path: ":teamId/edit",
            element: <EditTeam />,
          },
          {
            path: "new",
            element: <NewTeamForm />,
          },
        ],
      },
    ],
  },
  {
    element: <PageLayout />,
    children: [
      {
        element: <Privacy />,
        path: "/privacy",
      },
      {
        element: <Tos />,
        path: "/tos",
      },
    ],
  },
  {
    element: <Contact />,
    path: "/contact-us",
  },
];
```

你可能发现了 js 比 jsx 的形式的代码行数要多很多，jsx 的只有 16 行，js 的需要 51 行，jsx 的优势在于可以一行写多个属性。

### 路由排序(Ranking Routes)

当我们配置了这样的路由:

```jsx
<Route path="/invoices/:number" element={<InvoicesDetail/>} />
<Route path="/invoices/new" element={<NewInvoice/>} />
```

访问 `/invoices/new` 时会匹配哪个路由呢？React Router 做了优先静态的策略，会匹配到 NewInvoice 这条路由。但是定义路由时为了不引起不必要的困扰最好不要这样写。你可以调换顺序，也可以用新的路径。

具体代码见 demo-7



dynamic segments

todo:
命令式调用路由跳转 done
json 式定义路由
代码分割
全局拦截
