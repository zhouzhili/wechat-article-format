<template>
  <div class="output scroll-bar-big">
    <div class="result-wrap" v-if="isShowInMobile">
      <div class="zoom-area scroll-bar-small">
        <div v-html="output" class="result" ref="mobileResult"></div>
      </div>
    </div>
    <div v-html="output" class="full-view-output" v-else ref="result"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import bus from '@/utils/bus'

const { mapState } = createNamespacedHelpers('Home')
export default {
  name: 'Output',
  computed: {
    ...mapState(['isShowInMobile', 'output'])
  },
  mounted () {
    bus.$on('copy', () => {
      var clipboardDiv = this.isShowInMobile ? this.$refs.mobileResult : this.$refs.result
      clipboardDiv.focus()
      window.getSelection().removeAllRanges()
      var range = document.createRange()
      range.setStartBefore(clipboardDiv.firstChild)
      range.setEndAfter(clipboardDiv.lastChild)
      window.getSelection().addRange(range)

      try {
        if (document.execCommand('copy')) {
          this.$message.success('已复制到剪贴板')
        } else {
          this.$message.error('未能复制到剪贴板，请全选后右键复制')
        }
      } catch (err) {
        this.$message.error('未能复制到剪贴板，请全选后右键复制')
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.output {
  min-width: 600px;
  max-width: 50%;
  border: 1px solid #ddd;
  padding: 10px;
  margin-left: 10px;
  overflow: auto;
  .result-wrap {
    margin: 0 auto;
    width: 375px;
    height: 690px;
    position: relative;
    background-image: url("../assets/iphone_7.png");
    background-repeat: no-repeat;
    background-size: 90%;
    .zoom-area {
      position: absolute;
      top: 89px;
      left: 23px;
      width: 292px;
      height: 515px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .result {
      width: 100%;
      height: 100%;
      position: absolute;
      background-size: 100% auto;
      z-index: 1;
      transform: translate(0, 0);
    }
  }
  .full-view-output {
    height: 100%;
    max-width: 100%;
    padding: 0 10px;
  }
}
</style>
