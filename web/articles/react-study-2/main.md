# React -- 第 2 天

> 从官网开始一步步学完 React，计划用时 3 天，第 2 天 -- 进阶指南。

## 易读易用性

> Accessibility

只有 html 属性和 data- 以及 aria- 才会显示在 Dom 中，其余的 key 或其他，是扩展性质的，便于向下级组件传递数据。aria 是 Accessible Rich Internet Applications 的缩写，下面 Demo 渲染出的 Dom 是有 aria 开头的属性的，Demo 5.1:

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.onchangeHandler = this.onchangeHandler.bind(this);
    this.state = {
      labelText: 'labelText',
      inputValue: 'inputValue'
    };
  }

  onchangeHandler(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    return (<input
      type="text"
      aria-label={this.state.labelText}
      aria-required="true"
      onChange={this.onchangeHandler}
      value={this.state.inputValue}
      name="name"
    />);
  }
}
ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);
```

标签语义化更好的表单，Demo 5.2:
```js
class App extends React.Component {

  render() {
    return (
      <div>
        <label htmlFor="namedInput">Name:</label>
        <input id="namedInput" type="text" name="name"/>
      </div>
    );
  }
}
ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);
```

管理焦点，组件初始化完成 2 秒后 input 获得焦点，Demo 5.3:
```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();

    setTimeout(() => {
      this.inputElement.current.focus();
    }, 2000);
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}
ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);
```

下面是一个点击空白处关闭弹框的例子，Demo 5.4:
```js
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
ReactDOM.render(
  <OuterClickExample/>, 
  document.getElementById('root')
);
```

## 代码分割

> Code-Splitting

大型项目不可能全部逻辑放在一个文件中对外输出，这时就需要代码分割了。我们用的是官方提供的项目生成工具 create-react-app，需要在生成的项目中添加两个依赖包：

```shell
yarn add react-router-dom --dev
yarn add react-loadable --dev
```

使用这种方式就可以将代码打包成多个 chunk，同事演示了路由的用法，运行 yarn build 可以查看打包结果，Demo 5.5
```js
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Loadable from 'react-loadable';

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

const Loading = () => <div>Loading...</div>;
const Home = Loadable({
  loader: () => import('./routes/Home.js'),
  loading: Loading,
});

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);
```
补充示例 routes/Home.js 中的代码
```js
import React, { Component}  from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
}

export default Home;
```

## 上下文(Context)

为了解决组件跨层传递数据的问题，官方说组件之间的 top-down (parent to child) (也就是从上到下数据流)这在某些场景下是 cumbersome(笨重) 的。相当于全局变量，被用在 主题、用户 这类数据上。

下面是从 App 组件，略过 Toolbar 组件直接将 theme 到 ThemedButton 组件，可以看到 Toolbar 组件对 theme 是无感的，Demo 5.6:
```js
const ThemeContext = React.createContext('light');
function Toolbar() {
  return (
    <div>
      <ThemedButton/>
    </div>
  );
}
function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme =>
        <div className={theme}>{theme}</div>
      }
    </ThemeContext.Consumer>
  );
}
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar/>
      </ThemeContext.Provider>
    );
  }
}
ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);
```

## 错误影响最小化

> Error Boundaries

错误的边界，其实就是把错误围起来，不让它跑到外面做坏事。
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

```js

```

```js

```

```js

```

```js

```
