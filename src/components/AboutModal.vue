<template>
  <a-modal title="关于" :visible="visible" @cancel="handleOk">
    <p>
      闲着无聊想打理一下尘封已久的公众号，但是微信文章编辑器实在是太难用了，网上也有一些markdown转微信文章的，但是风格都不太符合我的胃口，那么，便做一个自己喜欢的markdown转微信文章的编辑器吧。
    </p>
    <p>
      我是zhili，如果你喜欢这个工具，可以关注我的个人微信公众号:<strong>前端技术潮流</strong>
        <div class="wechat-logo"></div>
      或者给这个项目添加一个star
      <a href="https://github.com/zhouzhili/wechat-article-format">GitHub</a>
      <br />
      有问题可以在
      <a href="https://github.com/zhouzhili/wechat-article-format/issues"
        >issue</a
      >
      中提出，代码将在后面开放出来
    </p>
    <p>
      您的支持是我最大的动力
      <img />
    </p>
    <template slot="footer">
      <a-button key="back" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    this.$on('open', () => {
      this.visible = true
    })
  },
  methods: {
    handleOk () {
      this.visible = false
    }
  }
}
</script>

<style scoped>
.wechat-logo {
  height: 140px;
  background: url("../assets/wechat.jpg");
  background-size: 140px;
  background-repeat: no-repeat;
}
</style>
