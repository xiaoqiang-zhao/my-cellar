<template>
  <div class="hello">
    <textarea name="md" cols="30" rows="10" v-model="mdText"></textarea>
    <div v-html="mdHTML"></div>
  </div>
</template>

<script>
import remark from 'remark'
import styleGuide from 'remark-preset-lint-markdown-style-guide'
import html from 'remark-html'
import report from 'vfile-reporter'

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

## 二级标题`,
      mdHTML: ''
    }
  },
  methods: {
    md () {
      let me = this
      remark()
        .use(styleGuide)
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
