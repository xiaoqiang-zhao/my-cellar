# 谈谈 Element 文档中的 Markdown 解析
Element 的文档站与普通的 web 项目开发并无二致，只不过我们把 Markdown 当成 Vue 组件来使用。在文档中，我们还编写了许多示例去描述组件的用法。在编写示例代码时，我们还有这两个需求：

示例代码格与单文件组件保持一致
示例代码像组件一样在页面中渲染
原生的 Markdown 不具备上述功能。因此，势必要对 Markdown 进行特殊的订制，拓展其能力。订制过的 Markdown 像下面这样。

## 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件
```html
<el-input
  placeholder="请输入内容"
  v-model="input"
  :disabled="true">
</el-input>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::
看到这里，你可能会好奇 Element 文档站是如何实现这些功能的，本文将带你一探究竟。

从 Webpack 配置入手
Webpack 通过 loader 来处理特定类型的文件。要想理解其原理，可以先从项目的 Webpack 配置（webpack.demo.js）入手。

{
  test: '\.md$',
  use: [
    {
      loader: 'vue-loader'
    },
    {
      loader: path.resolve(__dirname, './md-loader/index.js')
    }
  ]
}
从配置文件中可以看出，Markdown 先经由 md-loader 处理，然后再交由 vue-loader 处理。经过这两个 loader 的处理，Markdown 就与 Vue 组件一样了。

在分析 md-loader 原理之前，先对 Element 文档格式做一下简单的介绍。

约定的文档格式
Element 文档与普通的 Markdown 略有差异，约定了文档的格式。::: demo 中写演示的例子，::: demo 中 ```(fence)中编写代码。::: 属于Markdown 中的拓展语法，通过它来自定义容器。

最终达到的效果如下图所示：


预期效果
分析
我们的需求很多明确：实现 md-loader，把 Markdown 转化成 Vue 组件。一个典型的单文件组件包括三块：template，script 与 style。对于 Element 的文档来说，demo 中 style 是不提取的。那么接下的重点就是如何拼凑出 template 与 script 的内容。

使用 markdown-it 可以很方便地把普通的 Markdown 文本转换成 HTML。但要如何处理 demo 自定义容器与其包含的代码片段呢？

对于 demo 自定义容器，无非是自定义它的渲染策略，比如把该容器转化一个 demo-block 组件。
对于容器包含的代码片段，要多做一些处理。它除了被转换成 HTML 片段，还要提取出来作为一个组件去渲染。
markdown-it 处理后的内容构成 template，容器内的代码片段被转化成组件，构成 script。整个转换过程如下图所示：


下面开始讲解一下具体的实现。

Markdown 编译
使用 markdown-it-container 来转换自定义容器。

module.exports = md => {
  md.use(require('markdown-it-container'), 'demo', {
    // ....
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return `<demo-block><div>${md.render(description)}</div>`;
      }
      return '</demo-block>';
    }
  });
};
自定义容器 demo 就被转成了 demo-block 组件。

针对代码块（fence），markdown-it 有默认的渲染逻辑。当代码块在 demo 容器内要做一下特殊处理。

const defaultRender = md.renderer.rules.fence;
// 覆盖默认渲染规则
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  // ...
  if (tokens[idx].info === 'html' && isInDemoContainer) {
    return `<template slot="highlight">
        <pre v-pre>
          <code class="html">...</code>
        </pre>
      </template>`;
  }
  return defaultRender(tokens, idx, options, env, self);
};
v-pre 是 Vue 自带的指令，用来显示原始 Mustache 标签。考虑到代码片段会包含 Mustache 标签，使用该指令来跳过对 code 的编译。

设置占位符
现在，我们已经完成了从 Markdown 到 HTML 的转换。还缺少点功能，demo 中的代码片段没有渲染。


要渲染代码片段，关注以下两点：

如何渲染
组件的位置
在 Vue 中，可以使用一个普通的 JavaScript 对象来定义组件。把代码片段转化成一个对象，之后在父元素中注册一下即可，问题 1 就解决了。

再看问题 2。代码区域即是组件要显示的位置。在 markdown-it 编译代码片段前，我们还需要把代码复制一份（上文中提到了代码既要显示还要渲染），创建一个占位符，用来放置在下一步才注册的组件。

md.use(require('markdown-it-container'), 'demo', {
  render(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return `<demo-block>
      ...
      __START__${code}__END__
      `;
    }
    return '</demo-block>';
  }
});
__START__${code}__END__ 就是占位符。之后要把占位符的内容进行编译并替换为组件。

这里的做法类似于宏替换。
代码片段转换成组件
代码片段的 script 原本就是导出对象。把 template 转换成 render 函数，再将 script 与 render 函数合并，这样就把代码片段转换成组件。

vue-template-compiler 正好是我们所需要的。先调用 Vue.compile 方法，查看编译后的效果。

//const res = Vue.compile('<div>demo</div>')

// res.render
function anonymous() {
  with(this) {
    return _c('div',[_v("demo")])
  }
}

// res.staticRenderFns
[]
render 函数中包含了 with 语句。with 语句是不建议使用，知乎上有关于这个问题的讨论。在该问题的回答中，Vue 作者尤雨溪提到了 vue-loader 是把 with 给去掉了。先看一下 vue-loader 是如何编译 template 的。核心逻辑如下：

const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');

const finalOptions = {
  source: `<div>${template}</div>`,
  compiler
};
const compiled = compileTemplate(finalOptions);
compiled 包含了编译之后的结果，compiled.code 即是我们想要的内容。

// compiled.code
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  // ....
]
render._withStripped = true
使用 @vue/component-compiler-utils 与 vue-template-compiler 相配合就完成对 template 的编译。接下来把 render，staticRenderFns 与 script 合并成一个对象。使用自执行函数将合成后的结果返回，这样就获得了组件内容。

script = script.replace(/export\s+default/, 'const demoComponentExport =');

const demoComponentContent = `(function() {
  ${compiled.code}
  ${script}
  return {
    render,
    staticRenderFns,
    ...demoComponentExport
  }
})()`

编译组件完成后，就剩批量注册组件以及占位符替换了。最后这两步本质上是字符串拼接，不再赘述。

自定义 loader 的核心代码大致如下：

module.exports = function(source) {
  const content = md.render(source);

  let componentsString = ''; // 局部注册组件的内容
  let output = []; // 输出的内容

  // 对 content 进行处理，拼接处理 template 与 script 内容

  return `
    <template>
      <section class="content element-doc">
        ${output.join('')}
      </section>
    </template>
    <script>
      export default {
        name: 'component-doc',
        components: {
          ${componentsString}
        }
      }
    </script>
  `;
};
核心的转换逻辑到这里讲解完毕，完整的代码点击这里。

总结
本文介绍了 Element 文档站中 md-loader 的实现。由于 Markdown 支持自定义容器，因此我们不仅仅可以在文档中写 Vue 组件，当然更可以写 React，比如 docz。大家可以结合自己的业务场景发掘出更多的用法，希望本文能给你带来一些的启发。

参考资料
markdown-it
vuepress
vue-loader
发布于 2019-06-12