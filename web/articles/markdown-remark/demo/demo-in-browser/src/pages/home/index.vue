<template>
  <div class="hello">
    <textarea name="md" cols="30" rows="10" v-model="mdText"></textarea>
    <div class="markdown-body" v-html="mdHTML"></div>
  </div>
</template>

<script>
import unified from 'unified'
import markdown from 'remark-parse'
// import remark from 'remark'
// import styleGuide from 'remark-preset-lint-markdown-style-guide'
import html from 'remark-html'
import report from 'vfile-reporter'
import highlight from 'remark-highlight.js'
import 'github-markdown-css'

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

~~~css
h1 {
  color: red;
}
~~~

~~~jsvascript
let a = '';
console.log(a)
`,
      mdHTML: ''
    }
  },
  methods: {
    md () {
      let me = this
      unified()
        .use(markdown)
        .use(highlight)
        .use(html)
        .process(this.mdText, (err, file) => {
          console.error(report(err || file))
          me.mdHTML = file.contents
        })
    }
  }
}
</script>

<style scoped lang="less"></style>
