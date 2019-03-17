<template>
  <div class="hello">
    <h1>欢迎来到 vue 自定义脚手架 spa-simple</h1>
    <h2>定位</h2>
    <div>
      作为以 vue 为基础的开源项目的基础工程，选用业界最通用的规范和最领先的技术，去掉不必要的定制，开箱既用，方便更多的人参与进来。
    </div>
    <h2>特性</h2>
    <ul class="feature-list">
      <li class="iconfont icon-item-right">
        {{text}}
      </li>
      <li>
        <a href="https://standardjs.com/" target="_blank">standard 规范</a>
      </li>
      <li>
        <a  href="http://www.iconfont.cn/" target="_blank">iconfont 图标</a>
      </li>
      <li>
        <a href="http://necolas.github.io/normalize.css/" target="_blank">CSS Normalize</a>
      </li>
      <li>
        vue-cli 原生提供的 vue-router、hot-load、less
      </li>
    </ul>
    <mock-img :pic-url="picUrl"/>
  </div>
</template>

<script>
import mockImg from '@/components/mock-img'

export default {
  components: {
    mockImg
  },
  data () {
    this.$http.get('/a').then(res => {
      this.text = res.data.text
      this.picUrl = res.data.picUrl
    })

    return {
      text: '',
      picUrl: ''
    }
  }
}
</script>

<style scoped lang="less">
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .feature-list {
    > li {
      display: block;
    }
  }
</style>
