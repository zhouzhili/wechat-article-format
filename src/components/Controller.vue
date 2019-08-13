<template>
  <div class="ctr-wrap">
    <div class="ctr-item">
      <a-checkbox @change="handleOvChange">模拟手机预览</a-checkbox>
    </div>

    <div class="ctr-item">
      <a-checkbox @change="handleAddRefer" :defaultChecked="true"
        >文末添加引用</a-checkbox
      >
    </div>

    <div class="ctr-item">
      样式风格：
      <a-select
        placeholder="选择一种样式"
        defaultValue="默认样式"
        style="width: 150px"
        @change="handleChangeStyle"
      >
        <a-select-option v-for="item in styleList" :key="item" :value="item">
          {{ item }}
        </a-select-option>
      </a-select>
    </div>

    <div class="ctr-item">
      代码风格：
      <a-select
        defaultValue="atom-one-dark"
        showSearch
        placeholder="选择一种样式"
        optionFilterProp="children"
        :filterOption="filterOption"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option
          v-for="item in codeStyleList"
          :key="item"
          :value="item"
        >
          {{ item }}
        </a-select-option>
      </a-select>
    </div>

    <span class="ctr-item">
      <a-button @click="changeStyle" class="btn">{{
        showStyleEditor ? "取消修改" : "修改样式"
      }}</a-button>
    </span>

    <span class="ctr-item" v-if="showStyleEditor">
      <a-button @click="saveStyle" class="btn">保存样式</a-button>
    </span>

    <span class="ctr-item">
      <a-button @click="copy" class="btn">复制</a-button>
    </span>

    <span>
      <a-button @click="handleAbout" type="primary" ghost class="btn"
        >关于</a-button
      >
    </span>
    <AboutModal ref="aboutModal" />
  </div>
</template>

<script>
import Vue from 'vue'
import Button from 'ant-design-vue/lib/button'
import Checkbox from 'ant-design-vue/lib/checkbox'
import Select from 'ant-design-vue/lib/select'
import 'ant-design-vue/lib/select/style'
import 'ant-design-vue/lib/button/style'
import 'ant-design-vue/lib/checkbox/style'

import AboutModal from './AboutModal'

import bus from '@/utils/bus'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapState } = createNamespacedHelpers('Home')

Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Select)

const cssEl = document.createElement('link')

export default {
  name: 'Controller',
  data () {
    return {
      codeStyleList: Object.freeze([
        'a11y-dark',
        'a11y-light',
        'agate',
        'an-old-hope',
        'androidstudio',
        'arduino-light',
        'arta',
        'ascetic',
        'atom-one-dark-reasonable',
        'atom-one-dark',
        'atom-one-light',
        'brown-paper',
        'codepen-embed',
        'color-brewer',
        'darcula',
        'dark',
        'darkula',
        'default',
        'docco',
        'dracula',
        'far',
        'foundation',
        'github-gist',
        'github',
        'gml',
        'googlecode',
        'grayscale',
        'gruvbox-dark',
        'gruvbox-light',
        'hopscotch',
        'hybrid',
        'idea',
        'ir-black',
        'isbl-editor-dark',
        'isbl-editor-light',
        'kimbie.dark',
        'kimbie.light',
        'lightfair',
        'magula',
        'mono-blue',
        'monokai-sublime',
        'monokai',
        'nord',
        'obsidian',
        'ocean',
        'paraiso-dark',
        'paraiso-light',
        'pojoaque',
        'purebasic',
        'qtcreator_dark',
        'qtcreator_light',
        'railscasts',
        'rainbow',
        'routeros',
        'school-book',
        'shades-of-purple',
        'solarized-dark',
        'solarized-light',
        'sunburst',
        'tomorrow-night-blue',
        'tomorrow-night-bright',
        'tomorrow-night-eighties',
        'tomorrow-night',
        'tomorrow',
        'vs',
        'vs2015',
        'xcode',
        'xt256',
        'zenburn'
      ])
    }
  },
  beforeMount () {
    const codeStyle = 'atom-one-dark'
    cssEl.href = `./styles/${codeStyle}.css`
    cssEl.type = 'text/css'
    cssEl.rel = 'stylesheet'
    document.getElementsByTagName('head')[0].appendChild(cssEl)
  },
  computed: {
    ...mapState(['showStyleEditor', 'styleList'])
  },
  components: {
    AboutModal
  },
  methods: {
    ...mapMutations(['set_isShowInMobile', 'set_showStyleEditor', 'set_useReference', 'set_selectedStyle', 'refresh']),
    handleOvChange (e) {
      this.set_isShowInMobile(e.target.checked)
    },
    copy () {
      bus.$emit('copy')
    },
    handleChange (val) {
      cssEl.href = `./styles/${val}.css`
    },
    handleAddRefer (e) {
      this.set_useReference(e.target.checked)
      this.refresh()
    },
    filterOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    changeStyle () {
      if (this.showStyleEditor) {
        const se = document.querySelectorAll(`.output .selected`)
        for (let i = 0; i < se.length; i++) {
          se[i].classList.remove('selected')
        }
      }
      this.set_showStyleEditor(!this.showStyleEditor)
    },
    saveStyle () {
      bus.$emit('saveStyle')
    },
    handleChangeStyle (val) {
      this.set_selectedStyle(val)
      this.refresh()
    },
    handleAbout () {
      this.$refs.aboutModal.$emit('open')
    }
  }
}
</script>

<style lang='scss' scoped>
.ctr-wrap {
  padding: 5px 20px;
  .ctr-item {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid #ddd;
  }
}
</style>
