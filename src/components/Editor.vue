<template>
  <textarea ref="editor" class="editor scroll-bar-big" @keyup="handleRefresh" />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('Home')

let editor = null
export default {
  name: 'Editor',
  methods: {
    ...mapMutations(['set_input', 'refresh']),
    handleRefresh () {
      this.set_input(editor.value)
      this.refresh()
    }
  },
  mounted () {
    fetch('default.md').then(resp => resp.text()).then(resp => {
      editor = this.$refs.editor
      editor.value = resp
      this.handleRefresh()
    })
  }
}
</script>

<style lang='scss' scoped>
.editor {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 10px;
  font-size: 16px;
  line-height: 24px;
  font-family: Monaco;
  &:focus {
    outline-color: #ddd;
  }
}
</style>
