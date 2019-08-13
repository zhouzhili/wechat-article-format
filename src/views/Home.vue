<template>
  <div class="home">
    <Controller />
    <div class="home-container">
      <div v-if="showStyleEditor" class="editor-wrap">
        <StyleEditor />
      </div>
      <div v-else class="editor-wrap">
        <Editor />
      </div>
      <Output ref="output" />
    </div>
  </div>
</template>

<script>
import Controller from '@/components/Controller'
import Editor from '@/components/Editor'
import StyleEditor from '@/components/StyleEditor'
import Output from '@/components/Output'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Home')

export default {
  name: 'home',
  data () {
    return {

    }
  },
  components: {
    Controller,
    Editor,
    StyleEditor,
    Output
  },
  computed: {
    ...mapState(['showStyleEditor'])
  },
  methods: {
  }
}
</script>

<style lang='scss' scope>
.home {
  height: 100vh;
  width: 100%;
  overflow: hidden;

  .home-container {
    height: calc(100vh - 40px);
    display: flex;
    padding: 5px 20px 10px 20px;

    .editor-wrap {
      flex: 1;
    }
  }
}
</style>
