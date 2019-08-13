import WxRender from '@/utils/wxRender'
import marked from 'marked'

const theme = require('@/themes/default.json')
let wxRenderer = new WxRender({
  theme: theme
})

const stylesEl = wxRenderer.stylesEl

const styleList = ['默认样式']
if (window.localStorage.getItem('WECHAT_STYLE')) {
  styleList.push('自定义样式')
}

const state = {
  isShowInMobile: false,
  showStyleEditor: false,
  output: '',
  input: '',
  useReference: true,
  stylesEl,
  selectedStyle: '默认样式',
  styleList
}

const mutations = {
  set_isShowInMobile (state, tag) {
    state.isShowInMobile = tag
  },
  set_showStyleEditor (state, show) {
    state.showStyleEditor = show
  },
  set_input (state, input) {
    state.input = input
  },
  set_output (state, output) {
    state.output = output
  },
  set_useReference (state, use) {
    state.useReference = use
  },
  set_styleList (state) {
    state.styleList = ['默认样式', '自定义样式']
  },
  set_selectedStyle (state, style) {
    state.selectedStyle = style
  },
  refresh (state) {
    try {
      let curStyle = theme
      if (state.selectedStyle === '自定义样式') {
        const customStyle = window.localStorage.getItem('WECHAT_STYLE')
        curStyle = JSON.parse(customStyle)
      }
      wxRenderer.changeTheme(curStyle)
      let output = marked(state.input, {
        renderer: wxRenderer.getRenderer(state.useReference)
      })
      if (wxRenderer.hasFootnotes()) {
        output += wxRenderer.buildFootnotes()
      }
      state.output = output
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
