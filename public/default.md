## 指导

这是一篇讲解如何正确使用 **Markdown** 的排版示例，学会这个很有必要，能让你的文章有更佳清晰的排版。

本工具的样式可以根据默认样式进行修改，代码风格有 69 种可供选择，点击复制即可直接打开微信文章编辑器进行粘贴

> 引用文本：Markdown is a text formatting syntax inspired

## 语法指导

### 普通内容

这段内容展示了在内容里面一些小的格式，比如：

- **加粗** - `**加粗**`
- _倾斜_ - `*倾斜*`
- ~~删除线~~ - `~~删除线~~`
- `Code 标记` - Code 标记
- [超级链接](http://github.com) - 链接会在文末 References 部分列出，如不需要可以在上方配置里删除
- [username@gmail.com](mailto:username@gmail.com) - `[username@gmail.com](mailto:username@gmail.com)`
  。

### 段落

留空白的换行，将会被自动转换成一个段落，会有一定的段落间距，便于阅读。

请注意后面 Markdown 源代码的换行留空情况。

### 大标题 - Heading 3

你可以使用标题，鉴于微信文章的排版，本排版程序只设置了 3 级以上和 3 级以下的标题样式，如有需要可以提 issue

> NOTE: 别忘了 # 后面需要有空格！

## Heading 1

#### Heading 4

### 图片

你可以用自己图床，也可以上传到微信媒体库再把图片 URL 粘贴回来，或者编辑好以后，在公众号里插入图片。如果图片过多，复制到微信文章编辑器里会报错，暂时不知是什么原因

![图](https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/login/loginpage/images/bg_banner4273fb.png)

### 代码块

#### 语法高亮支持

**代码风格有 69 种可供选择**

如果在 \`\`\` 后面更随语言名称，可以有语法高亮的效果哦，比如:

##### 演示 JS 代码高亮

```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
```

##### 演示 html 高亮

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

### 有序、无序列表

#### 无序列表

- Ruby
  - Rails
    - ActiveRecord
- Go
  - Gofmt
  - Revel
- Node.js
  - Koa
  - Express

#### 有序列表

1. Node.js
1. Express
1. Koa
1. Sails
1. Ruby
1. Rails
1. Sinatra
1. Go

### 表格

如果需要展示数据什么的，可以选择使用表格哦

| header 1 | header 3 |
| -------- | -------- |
| cell 1   | cell 2   |
| cell 3   | cell 4   |
| cell 5   | cell 6   |
