<template>
  <div class="mock-img">
    <img :src="picUrl">
  </div>
</template>

<script>
export default {
  props: {
    picUrl: String
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">

</style>
