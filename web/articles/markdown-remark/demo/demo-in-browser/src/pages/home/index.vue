<template>
  <div class="hello">
    <textarea name="md" cols="30" rows="10" v-model="mdText"></textarea>
    <div class="markdown-body" v-html="mdHTML"></div>
  </div>
</template>

<script>
// import styleGuide from 'remark-preset-lint-markdown-style-guide'
import html from 'remark-html'
import midas from 'remark-midas'
import report from 'vfile-reporter'
import 'github-markdown-css'

// unified 模式
// import unified from 'unified'
import highlight from 'remark-highlight.js'
// import markdown from 'remark-parse'

// remark 模式
import remark from 'remark'

export default {
  mounted () {
    this.md()
  },
  watch: {
    mdText (newValue, oldValue) {
      this.md()
    }
  },
  data () {
    return {
      mdText: `# 大标题

>说明文字。

## 二级标题

CSS 代码

~~~css
h1 {
  color: red;
}
~~~

Less 代码
~~~less
.a {
  .b {
    display: block;
  }
}
~~~

Javascript 代码
~~~jsvascript
let a = '';
console.log(a);
~~~

表格：

Name | Academy | score 
- | :-: | -: 
Harry Potter | Gryffindor| 90 
Hermione Granger | Gryffindor | 100 
Draco Malfoy | Slytherin | 90

图片：-- 图片的引用路径是个问题，需要制定一套规则，比如图片库..

![ddd](/static/img/long.060c26b.jpg)

文本样式：[链接](http://baidu.com)  **加粗** \`引用\` ~~删除~~

1. 列表一
2. 列表二

- 列表一
- 列表二

换行  
而非换段落

换段落

换段落
`,
      mdHTML: ''
    }
  },
  methods: {
    md () {
      let me = this
      // unified 模式
      // unified()
      //   .use(markdown)
      //   .use(highlight)
      //   .use([html, midas])
      //   // .use(midas)
      //   .process(this.mdText, (err, file) => {
      //     console.error(report(err || file))
      //     me.mdHTML = file.contents
      //   })

      // remark 模式
      remark()
        .use([ html, midas ])
        .use(highlight)
        .process(this.mdText, (err, file) => {
          console.error(report(err || file))
          me.mdHTML = file.contents
        })
    }
  }
}
</script>

<style scoped lang="less"></style>
