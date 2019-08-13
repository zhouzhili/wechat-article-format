<template>
  <div class="jsoneditor" ref="styleEditor"></div>
</template>

<script>
import 'jsoneditor/dist/jsoneditor.min.css'
import bus from '@/utils/bus'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('Home')

const JSONEditor = require('jsoneditor/dist/jsoneditor')
const json = require('@/themes/default.json')

let editor = null

export default {
  name: 'styleEditor',
  data () {
    return {
      currentNode: ''
    }
  },
  computed: {
    ...mapState(['showStyleEditor', 'stylesEl', 'selectedStyle'])
  },
  watch: {
    selectedStyle (val) {
      if (this.showStyleEditor) {
        this.setEditorJson(val)
      }
    }
  },
  methods: {
    ...mapMutations(['set_styleList', 'set_selectedStyle']),
    highLightNode () {
      const se = document.querySelectorAll(`.output .selected`)
      for (let i = 0; i < se.length; i++) {
        se[i].classList.remove('selected')
      }
      const el = document.querySelectorAll(`.output .${this.currentNode}`)
      for (let i = 0; i < el.length; i++) {
        el[i].classList.add('selected')
      }
    },
    saveStyle () {
      window.localStorage.setItem('WECHAT_STYLE', JSON.stringify(editor.get()))
      this.set_styleList()
      this.set_selectedStyle('自定义样式')
      this.$message.success('保存为自定义样式成功')
    },
    setEditorJson (val) {
      if (val === '默认样式') {
        editor.set(json)
      } else {
        const custom = window.localStorage.getItem('WECHAT_STYLE')
        editor.set(JSON.parse(custom))
      }
      editor.expandAll()
    }
  },
  mounted () {
    const self = this
    const opts = {
      mode: 'tree',
      modes: ['tree'],
      enableSort: false,
      onEvent (node, event) {
        if (event.type === 'click') {
          if (node.path.length > 0 && this.currentNode !== node.path[0]) {
            self.currentNode = node.path[0]
            self.highLightNode()
          }
        }
      },
      onChange () {
        const json = editor.get()
        const cur = json[self.currentNode]
        if (cur && self.stylesEl[self.currentNode]) {
          let style = ''
          for (let i in cur) {
            style += `${i}:${cur[i]};`
          }
          self.stylesEl[self.currentNode].innerText = `.${self.currentNode}{${style}}`
        }
      }
    }
    editor = new JSONEditor(this.$refs.styleEditor, opts)
    this.setEditorJson(this.selectedStyle)

    bus.$on('saveStyle', () => {
      if (window.localStorage.getItem('WECHAT_STYLE')) {
        this.$confirm({
          title: '确定保存为自定义样式吗',
          content: '保存将覆盖原有的自定义样式,请三思',
          onOk () {
            self.saveStyle()
          },
          onCancel () { }
        })
      } else {
        self.saveStyle()
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.jsoneditor {
  width: 100%;
  height: 100%;
}
</style>
