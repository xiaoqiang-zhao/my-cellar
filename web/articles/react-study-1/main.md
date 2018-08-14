# React -- 第 1 天

> 从官网开始一步步学完 React，计划用时 3 天，第 1 天 -- 主要概念和其 Demo。

## 开始

这里假设你的前端基础比较扎实，对 Webpack 也比较熟，熟练掌握 Vue(这是我自己的情况，学的时候会和 Vue 做比较)。

官网：[https://reactjs.org/](https://reactjs.org/)

官网提供了两种学习模式：

- learn by doing: 边做边学
- learn concepts step by step: 一个概念一个概念的学

我个人喜欢第二种，从核心概念开始(从 Hello world 一步步展开)，然后在看边做边学的示例项目就明快多了。第一个概念就是 `JSX`。

## JSX

一种 JavaSript 的扩展语法。为什么是 JSX 这种形式？从软件设计角度来说 React 认为界面、数据、状态和渲染是一个组件内部的逻辑，所以理因内聚。

代码还是跑起来才容易理解，在开始语法之前我们先引官方脚手架方便测试代码，后面单独拿出章节来研究 React 工程化。

```shell
mkdir react-study-1
npx create-react-app react-study-1
cd react-study-1
yarn
yarn start
```

这样一个 React 工程就启动了。页面配置在 public 文件夹下，入口是 src/index.js，业务代码长下面这样：

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

然后下面正式开始 JSX。

数据和模板拼接后的渲染 Demo 1.1：

```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

函数的使用 Demo 1.2：
```js
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

通过数据逻辑来呈现不同的 Dom，Demo 1.3：
```js
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
ReactDOM.render(
  getGreeting(user),
  document.getElementById('root')
);
```

自定义属性，Demo 1.4：
```js
const element = <div tabIndex="0">0</div>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
需要注意的是 React 会将驼峰命名的 Dom 属性全部小写化，输出的 Dom 是这样的：`<div tabindex="0">0</div>`，所以写属性的时候你可以认为是不区分大小写的。

对于自闭和标签，下面两种形式是等价的：
```js
const element = <img src={user.avatarUrl}></img>;
const element = <img src={user.avatarUrl}/>;
```

当然标签可以嵌套：
```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

输出时 React 是做了防注入过滤的，Demo 1.5：
```js
const title = '123</br>456';
// This is safe:
const element = <h1>{title}</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
输出的是 `<h1>123&lt;/br&gt;456</h1>`。

样式属性 class 在 JSX 语法中要换成 className 才可以，Demo 1.6：
```js
const element = (
  <h1 className="greeting hi">
    Hello, world!
  </h1>
);
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 渲染元素

> Rendering Elements

元素是组件的原材料。

```html
<div id="root"></div>
```
我们称上面这个 Dom 节点为根节点，因为将来的一切组件都会挂在他下面。

怎么将数据更新渲染到页面上呢，Demo 1.7：
```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);

```
React 通过虚拟 Dom 技术做最小量的 Dom 重绘，当时间改变时只会更新部分文字节点。

## 组件和属性

> Components and Props

最简单的组件就是函数组件，Demo 2.1:
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

组件可以被另一个组件引用并多次使用，Demo 2.2:
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
可以用这种方法把复杂的组件拆成多个简单组件，还有一点需要注意，属性 props 是只读的不可修改(当然也包括其下面的属性)。

## 组件的状态和生命周期

> State and Lifecycle

首先将 function 组件转换成 class 组件，Demo 2.3：
```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

想要让时钟动起来，优雅的动起来，就要讲到生命周期，组件在不同的阶段会触发一些钩子函数，比如组件第一次渲染被称为 “mounting” 阶段，渲染完成后触发的钩子函数是 “componentDidMount”，移除组件被称为 “unmounting” 移除之前触发的钩子函数是 “componentWillUnmount”，最后组件就可以写成这样
```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

设值 state 的时候需要用 this.setState 方法，不可以直接设置：
```js
// Correct
this.setState({comment: 'Hello'});
// Wrong
this.state.comment = 'Hello';
```

如果新 state 是同名旧 state 加工而成，建议使用回调，否则可能失败
```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

state 更新时会自动 merge，对数组和对象都生效
```js
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

最后需要注意，数据流向是单项流动，只能父组件通过属性传递给子组件，子组件不可以直接改变父组件的属性。

## 事件处理

> Handling Events

可以像零级事件模型那样绑事件，结合上面讲的 setState 看下面这个投票的例子，Demo 2.5
```js
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '未投票',
      total: 0
    };
  }

  handleClick(color) {
    this.setState({
      color
    });
    this.setState((prevState) => ({
      total: prevState.total + 1
    }));
  }

  render() {
    return (
      <div>
        <h1>当前投票：{this.state.color}，投票总计：{this.state.total}</h1>
        <div>
          <button onClick={e => this.handleClick('红队', e)}>红队</button>
          <button onClick={this.handleClick.bind(this, '绿队')}>绿队</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Box />,
  document.getElementById('root')
);
```
如果有参数需要直接传递，那么需要用箭头函数包装一下，否则绑定的就是执行结果；或者用 bind 关键字。

## 条件渲染

> Conditional Rendering

如果我们有两个组件，一个在登录后显示，一个在登录前显示，这就要用到判断，也就是条件渲染，Demo 3.1
```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

组件之间的交互可以通过父组件向下传递，按钮改变登录状态，通过变量 isLoggedIn 通知呈现组件呈现不同的内容，Demo 3.2
```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    console.log('render')

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick.bind(this)} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```
如果事件被多次绑定可以在 constructor 中做一下转换，这样就不用在每一处元素上加 bind。另外每一轮 state 更新都会触发重新 render，render 中的变量并没有做只能解析。

除了通过 js 控制元素切换展现，还可以直接在元素片段中控制
```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

还可以直接通过三元表达式判断：
```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

在一些情况下，你可能不想让组件的 Dom 进入到浏览器 Dom 中，你可以直接返回 null，Demo 3.3
```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

## 列表的标识

> Lists and Keys

简易列表渲染，通过 map 返回一个新数组，Demo 3.4
```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number*2}</li>
);
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

再看一个基础列表组件，Demo 3.5
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number*2}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

上面的示例会报一个错误，我们需要加 key 来修正一下，key 使虚拟 Dom 和实体 Dom 对应更加高效，在 React 中是强制的。
```js
<li key={number.toString()}>
```

当组件循环的时候，要加上 key，并且 key 的值在列表中一定要是唯一的，不唯一的字段不可以作为 key，Demo 3.6
```js
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value*2}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## 表单

> Forms

对于表单值的改变并没有双向绑定，需要借助 onChange 来更新数据，Demo 3.7。
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
ReactDOM.render(
  <NameForm/>,
  document.getElementById('root')
);
```

select 标签，在 React 中将原生 option 上的 selected 属性转移到了 select 节点的 value 上，Demo 3.8：
```js
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
ReactDOM.render(
  <FlavorForm/>,
  document.getElementById('root')
);
```

checkbox 表单，这里有一个小技巧，多个表单项的 onChange 的 handler 可以是同一个，用 type 和 name 来做分流，Demo 3.9：
```js
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
ReactDOM.render(
  <Reservation/>,
  document.getElementById('root')
);
```

如果没有 onChange 的支持，直接赋值的 Form 表单项是不可编辑的，但是值为 null 就成为了可编辑表单，Demo 3.10：
```js
ReactDOM.render(
  <input value="hi" />,
  document.getElementById('root')
);
setTimeout(function() {
  ReactDOM.render(
    <input value={null} />, 
    document.getElementById('root')
  );
}, 1000);
```

官方也意识到了写冗长的表单很乏味，表单的每一项都要 onChang 和 handler，官网推荐了一个库来解决这个问题 non-React。

## 状态提升

> Lifting State Up

使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。下面是你给一个温度，在这个温度下水会不会开，Demo 4.1：
```js
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水会烧开</p>;
  }
  return <p>水不会烧开</p>;
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>输入一个摄氏温度</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}
ReactDOM.render(<Calculator />, document.getElementById('root'));
```

上面例子其实是一个父组件影响子组件的一个例子，两个同级组件之间借助父组件相互影响才是这一章的重点，下面是一个温度转换的例子，摄氏温度和华氏温度转换，Demo 4.2：
```js
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水会烧开</p>;
  }
  return <p>水不会烧开</p>;
}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>在{scaleNames[scale]}:中输入温度数值</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

// 转换函数
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
ReactDOM.render(<Calculator />, document.getElementById('root'));
```

## 组合 vs 集成

> Composition vs Inheritance

React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。其实和 Vue 的 slot 是一回事，下面先来个简单的，Demo 4.3
```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
ReactDOM.render(<WelcomeDialog />, document.getElementById('root'));
```

一个组件的不同部分都允许被自定义，也就是组件的多个插槽，Demo 4.4：
```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}
function Contacts() {
  return (
    <div>Contacts</div>
  );
}
function Chat() {
  return (
    <div>Chat</div>
  );
}
function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
```

## 参考资料

[官方文档](https://reactjs.org/)

[怎样理顺 React，Flux，Redux 这些概念的关系](http://mp.weixin.qq.com/s?__biz=MzI0ODA2ODU2NQ==&mid=2651130035&idx=1&sn=627be0dce8d53b0b3b4bb72a18099761#rd)

[React移动Web极致优化 | 腾讯团队从0到1的经验总结](http://mp.weixin.qq.com/s?__biz=MzI0ODA2ODU2NQ==&mid=2651129590&idx=1&sn=59cddf60674781b357dab7f0995b7fc3&scene=19#wechat_redirect)

[阿里开源项目](https://github.com/thx/rap2-delos)

[Flux 与 Redux](http://www.tuicool.com/articles/3AFJNbj)