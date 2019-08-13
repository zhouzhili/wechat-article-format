import marked from 'marked'
import hljs from 'highlight.js'

let footnotes = []
let footnoteindex = 0

export default class WxRenderer {
  constructor (opts) {
    this.opts = opts
    this.stylesEl = {}
    this.buildTheme(this.opts.theme)
  }

  buildTheme (themeTpl) {
    for (let key in themeTpl) {
      const item = themeTpl[key]
      delete item.desc
      let style = ''
      for (let i in item) {
        style += `${i}:${item[i]};`
      }

      let el = this.stylesEl[key]
      if (!el) {
        el = document.createElement('style')
        el.setAttribute('type', 'text/css')
      }
      el.innerText = `.${key}{${style}}`

      document.querySelector('head').appendChild(el)
      this.stylesEl[key] = el
    }
  }

  changeTheme (theme) {
    this.buildTheme(theme)
  }

  S (tokenName) {
    const inlineEl = ['codespan', 'link', 'strong']
    if (tokenName in inlineEl) {
      return `class="base ${tokenName}"`
    }
    return `class="base base_block ${tokenName}"`
  }

  addFootnote (title, link) {
    footnoteindex += 1
    footnotes.push([footnoteindex, title, link])
    return footnoteindex
  }

  buildFootnotes () {
    var footnoteArray = footnotes.map(x => {
      if (x[1] === x[2]) {
        return '<code style="font-size: 90%; opacity: 0.6;">[' + x[0] + ']</code>: <i>' + x[1] + '</i><br/>'
      }
      return '<code style="font-size: 90%; opacity: 0.6;">[' + x[0] + ']</code> ' + x[1] + ': <i>' + x[2] + '</i><br/>'
    })
    return '<h3 ' + this.S('h3') + '>References</h3><p ' + this.S('footnotes') + '>' + footnoteArray.join('\n') + '</p>'
  }

  hasFootnotes () {
    return footnotes.length !== 0
  }

  getRenderer (useReferences = true) {
    footnotes = []
    footnoteindex = 0

    var renderer = new marked.Renderer()

    renderer.heading = (text, level) => {
      if (level < 3) {
        return '<h2 ' + this.S('h2') + '>' + text + '</h2>'
      } else {
        return '<h3 ' + this.S('h3') + '>' + text + '</h3>'
      }
    }
    renderer.paragraph = (text) => {
      return '<p ' + this.S('p') + '>' + text + '</p>'
    }
    renderer.blockquote = (text) => {
      return '<blockquote ' + this.S('blockquote') + '>' + text + '</blockquote>'
    }
    renderer.code = (code, language) => {
      return '<pre><code class="code hljs ' + language + '"' + '>' +
                hljs.highlight(language, code).value +
                '</code></pre>'
    }
    renderer.codespan = (text, infostring) => {
      return '<code ' + this.S('codespan') + '>' + text + '</code>'
    }
    renderer.listitem = (text) => {
      return '<span ' + this.S('listitem') + '><span style="margin-right: 10px;"><%s/></span>' + text + '</span>'
    }
    renderer.list = (text, ordered, start) => {
      var segments = text.split('<%s/>')
      if (!ordered) {
        text = segments.join('•')
        return '<p ' + this.S('ul') + '>' + text + '</p>'
      }
      text = segments[0]
      for (var i = 1; i < segments.length; i++) {
        text = text + i + '.' + segments[i]
      }
      return '<p ' + this.S('ol') + '>' + text + '</p>'
    }
    renderer.image = (href, title, text) => {
      return '<img ' + this.S('image') + ' src="' + href + '" title="' + title + '" alt="' + text + '"/>'
    }
    renderer.link = (href, title, text) => {
      if (href.indexOf('https://mp.weixin.qq.com') === 0) {
        return '<a href="' + href + '" title="' + (title || text) + '" ' + this.S('wx_link') + '>' + text + '</a>'
      } else if (href === text) {
        return `<span style='color:#1e6bb8'>${href}</span>`
      } else {
        if (useReferences) {
          var ref = this.addFootnote(title || text, href)
          return '<span ' + this.S('link') + '>' + text + '<sup>[' + ref + ']</sup></span>'
        } else {
          return '<a href="' + href + '" title="' + (title || text) + '" ' + this.S('link') + '>' + text + '</a>'
        }
      }
    }
    renderer.strong = (text) => {
      return '<strong ' + this.S('strong') + '>' + text + '</strong>'
    }
    renderer.em = (text) => {
      return '<i ' + this.S('strong') + '>' + text + '</i>'
    }
    renderer.table = (header, body) => {
      return '<table ' + this.S('table') + '><thead ' + this.S('thead') + '>' + header + '</thead><tbody>' + body + '</tbody></table>'
    }
    renderer.tablecell = (text) => {
      return '<td ' + this.S('td') + '>' + text + '</td>'
    }
    renderer.hr = () => {
      return `<hr ${this.S('hr')}/>`
    }
    return renderer
  }
}
