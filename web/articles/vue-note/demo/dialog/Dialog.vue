<template>
  <div class="weui_dialog_alert">
    <div class="weui_mask"
         @click="hideOnBlur && (show = false)"
         v-show="show"
         :transition="maskTransition"></div>
    <div class="weui_dialog" v-show="show" :transition="dialogTransition">
      <div v-if="title" class="title">
        {{title}}
        <span @click="closeDialog">关闭</span>
      </div>
      <slot></slot>
      <div v-if="buttons" class="buttons">
        <template v-for="button in buttons">
          <button @click="clickHandler(button)">{{button.text}}</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    hideOnBlur: Boolean,
    scroll: {
      type: Boolean,
      default: true
    },
    title: String,
    buttons: {
      type: [Array, Boolean],
      default: false
    }
  },
  watch: {
    show (val) {
      // this.$emit(val ? 'on-show' : 'on-hide')
    }
  },
  data: function () {
    return {};
  },
  methods: {
    closeDialog: function () {
      this.show = false;
    },
    clickHandler: function (buttonConfig) {

      buttonConfig.click || buttonConfig.click(this);
    }
  }
}
</script>

<style lang="less">
@import './styles/transition.less';
@import './styles/weui_mask.less';
@import './styles/weui_dialog.less';
</style>
