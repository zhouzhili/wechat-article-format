<template>
  <div id="app">
    <a-locale-provider :locale="local">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import LocaleProvider from 'ant-design-vue/lib/locale-provider'
import 'ant-design-vue/lib/locale-provider/style'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import Vue from 'vue'
Vue.use(LocaleProvider)
export default {
  data () {
    return {
      local: zhCN
    }
  }
}
</script>
